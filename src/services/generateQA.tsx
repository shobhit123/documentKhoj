import { apiRequest } from "../../src/Document/API";
import { API_ENDPOINTS } from "../../src/API/apiEndpoints";

export const generateQA = async (
  path: string,
  mimeType: string,
  questionGuidance: string,
  numQA: number | string
) => {
  const payload = {
    object_path: path,
    mime_type: mimeType,
    question_context: questionGuidance,
    no_of_qna: numQA,
  };

  return apiRequest(API_ENDPOINTS.GENERATE_QA, "POST", payload);
};

