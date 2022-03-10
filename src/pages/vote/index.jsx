import Join from "components/vote/join";
import PlaylistOverview from "components/vote/playlist-overview";
import { useEffect, useState } from "react";
import { getVoteData } from "services/logic/vote-logic";

export default function Vote() {
  const [socket, setSocket] = useState();
  const [codes, setCodes] = useState();
  const [voteState, setVoteState] = useState();

  useEffect(() => [voteState]);

  const connectToWebsocketServer = async (joinCode, accessCode) => {
    const voteData = await getVoteData({ joinCode, accessCode });

    let newSocket = new WebSocket("ws://localhost:5002/ws");
    newSocket.onopen = (event) => {
      const identifier = {
        voteDataUuid: voteData.uuid,
        websocketUuid: "8e382467-4330-477b-8c25-8ecdf5e694ed",
        joinCode,
        accessCode,
      };

      newSocket.send(JSON.stringify(identifier));
    };
    newSocket.onmessage = (event) => {
      update(event.data);
    };

    setSocket(newSocket);
  };

  const update = (data) => {
    const object = JSON.parse(data);
    setVoteState(object);
  };

  return (
    <div>
      {voteState !== undefined ? (
        <PlaylistOverview
          voteablePlaylistCollection={voteState?.VoteablePlaylistCollection}
        />
      ) : null}
      <Join
        onJoin={(joinCode, accessCode) => {
          setCodes({
            joinCode,
            accessCode,
          });
          connectToWebsocketServer(joinCode, accessCode);
        }}
      />
    </div>
  );
}
