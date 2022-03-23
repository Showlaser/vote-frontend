import Join from "components/vote/join";
import PlaylistOverview from "components/vote/playlist-overview";
import VoteOverView from "components/vote/vote-overview";
import { useEffect, useState } from "react";
import { getVoteData } from "services/logic/vote-logic";
import { toCamelCase } from "services/shared/general";
import { createGuid } from "services/shared/math";
import Cookies from "universal-cookie";

export default function Vote() {
  const [codes, setCodes] = useState();
  const [socket, setSocket] = useState();
  const [voteState, setVoteState] = useState();
  const cookie = new Cookies().get("vote");

  useEffect(() => [voteState, codes]);

  const connectToWebsocketServer = async (joinCode, accessCode) => {
    const voteData = await getVoteData({ joinCode, accessCode });

    let newSocket = new WebSocket("ws://192.168.1.31:5002/ws");
    newSocket.onopen = (event) => {
      const identifier = {
        voteDataUuid: voteData.uuid,
        websocketUuid: createGuid(),
        joinCode,
        accessCode,
      };

      newSocket.send(JSON.stringify(identifier));
    };
    newSocket.onmessage = (event) => {
      const object = JSON.parse(event.data, toCamelCase);
      setVoteState(object);
    };

    setVoteState(voteData);
  };

  const onJoin = (joinCode, accessCode) => {
    setCodes({
      joinCode,
      accessCode,
    });
    connectToWebsocketServer(joinCode, accessCode);
  };

  const getComponents = () => {
    const userVotedOnThisSession = cookie?.votes?.some(
      (vote) => vote?.joinCode === codes?.joinCode
    );

    if (
      !userVotedOnThisSession &&
      codes !== undefined &&
      voteState !== undefined
    ) {
      return (
        <PlaylistOverview
          codes={codes}
          voteState={voteState}
          voteablePlaylistCollection={voteState?.voteablePlaylistCollection}
        />
      );
    }
    if (voteState === undefined && codes === undefined) {
      return <Join onJoin={onJoin} />;
    }

    return <VoteOverView voteState={voteState} />;
  };

  return <div className="fade-up">{getComponents()}</div>;
}
