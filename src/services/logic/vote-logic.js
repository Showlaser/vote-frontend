import { Get, Post } from "services/shared/api/api-actions";
import { sendRequest } from "services/shared/api/api-middleware";
import apiEndpoints from "services/shared/api/api-urls";

export const getVoteData = async (codes) => {
  const response = await sendRequest(
    () =>
      Get(
        `${apiEndpoints.vote}?joinCode=${codes.joinCode}&accessCode=${codes.accessCode}`
      ),
    []
  );
  return response.json();
};

export const voteOnPlaylist = (voteData) => {
  return sendRequest(() => Post(`${apiEndpoints.vote}/vote`, voteData));
};