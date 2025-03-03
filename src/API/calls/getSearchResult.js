import { apiRequest } from "../../Document/API";

export const getSearchResults = async (content, mode, sessionId) => {
  const endpoint = "chat/search";
  const payload = { query: content, session_id: sessionId, mode: mode };

  return apiRequest(endpoint, "POST", payload);
};
