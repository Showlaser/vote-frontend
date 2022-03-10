import Join from "components/vote/join";
import { useState } from "react";
import { getVoteData } from "services/logic/vote-logic";

export default function Vote() {
  const [socket, setSocket] = useState();
  const [codes, setCodes] = useState();

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
      console.log("Message from server ", event.data);
    };

    setSocket(newSocket);
  };

  return (
    <div>
      {codes ? null : (
        <Join
          onJoin={(joinCode, accessCode) => {
            setCodes({
              joinCode,
              accessCode,
            });
            connectToWebsocketServer(joinCode, accessCode);
          }}
        />
      )}
    </div>
  );
}
