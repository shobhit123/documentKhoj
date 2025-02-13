import { apiRequest } from "../../Document/API";

export const generateQA = async (path, mimeType) => {
  const endpoint = "cloud_services/generate_qna";
  const payload = {
    object_path: path,
    mime_type: mimeType,
  };

  return apiRequest(endpoint, "POST", payload);
};
