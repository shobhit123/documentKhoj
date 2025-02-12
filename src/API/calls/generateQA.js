import { apiRequest } from "../../Document/API";

export const generateQA = async (path, mimeType) => {
  const endpoint = "/generate_qna";
  const payload = {
    object_path: path,
    mime_type: mimeType,
  };
  console.log('PAYLOAD', payload)

  return apiRequest(endpoint, "POST", payload);
};
