import { Grid, List, ListItem } from "@mui/material";
import Modal from "components/shared/modal";
import { useCallback, useState } from "react";
import { voteOnPlaylist } from "services/logic/vote-logic";
import PlaylistCard from "components/vote/playlist-card";
import Cookies from "universal-cookie";

export default function PlaylistOverview({
  voteablePlaylistCollection,
  codes,
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

      const time = new Date().getTime();
      const expires = new Date(time + 600000);

      cookies.remove(codes?.joinCode);
      cookies.set(codes?.joinCode, { voted: true }, { expires, path: "/" });
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
