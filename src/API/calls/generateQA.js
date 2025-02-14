import { apiRequest } from "../../Document/API";

export const generateQA = async (path, mimeType, question_guidance) => {
  const endpoint = "cloud_services/generate_qna";
  const payload = {
    object_path: path,
    mime_type: mimeType,
    question_context: question_guidance
  };

  return apiRequest(endpoint, "POST", payload);
};
