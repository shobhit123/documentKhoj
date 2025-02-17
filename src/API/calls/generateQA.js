import { apiRequest } from "../../Document/API";

export const generateQA = async (path, mimeType, question_guidance, numQA) => {
  const endpoint = "cloud_services/generate_qna";
  const payload = {
    object_path: path,
    mime_type: mimeType,
    question_context: question_guidance,
    no_of_qna: numQA
  };  
  return apiRequest(endpoint, "POST", payload);
};
