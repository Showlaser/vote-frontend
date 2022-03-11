import { Grid, List, ListItem } from "@mui/material";
import Modal from "components/shared/modal";
import { useCallback, useState } from "react";
import { voteOnPlaylist } from "services/logic/vote-logic";
import PlaylistCard from "components/vote/playlist-card";
import Cookies from "universal-cookie";
import { createGuid } from "services/shared/math";

export default function PlaylistOverview({
  voteablePlaylistCollection,
  codes,
  voteState,
}) {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [modalOptions, setModalOptions] = useState({
    title: "Vote for this playlist?",
    description: "You can only vote once!",
    onOkClick: undefined,
    show: false,
    onCancelClick: () => closeModal(),
  });

  const vote = async (votedPlaylist) => {
    let newModalOptions = modalOptions;
    newModalOptions.show = false;
    setModalOptions(newModalOptions);

    const result = await voteOnPlaylist({
      voteDataUuid: votedPlaylist.voteDataUuid,
      playlistUuid: votedPlaylist.uuid,
      joinData: codes,
    });

    if (result.status === 200) {
      const cookies = new Cookies();
      let currentVotes = cookies.get("vote") ?? { votes: [] };
      currentVotes.votes.push({
        expireDate: voteState.validUntil,
        joinCode: codes.joinCode,
      });
      // TODO add remove array item from cookie
      cookies.set("vote", currentVotes, { path: "/" });
    }
  };

  const onVoteButtonClick = (playlist) => {
    let newModalOptions = modalOptions;
    newModalOptions.show = true;
    newModalOptions.onOkClick = () => vote(playlist);

    setModalOptions(newModalOptions);
    forceUpdate();
  };

  const closeModal = () => {
    let modal = modalOptions;
    modal.show = false;
    setModalOptions(modal);
  };

  return (
    <Grid
      className="fade-up"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ marginTop: "25px" }}
    >
      <Modal modal={modalOptions} />
      <List style={{ width: "90%", maxWidth: "70vh" }}>
        {voteablePlaylistCollection?.map((playlist) => (
          <ListItem key={playlist.uuid}>
            <PlaylistCard
              playlist={playlist}
              setModalOptions={setModalOptions}
              onVoteButtonClick={onVoteButtonClick}
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
