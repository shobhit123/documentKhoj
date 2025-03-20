import { API_ENDPOINTS } from "src/API/apiEndpoints";
import { apiRequest } from "../../src/Document/API";

export const getSearchResults = async (
  content: "string",
  mode: "string",
  sessionId: "string" | "number"
) => {
  const payload = { query: content, session_id: sessionId, mode: mode };

  return apiRequest(API_ENDPOINTS.CHAT_REQUEST, "POST", payload);
};
