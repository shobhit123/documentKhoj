import { apiRequest } from "../../src/Document/API";
import { transformDataForApi } from "../../src/helper";
import { API_ENDPOINTS } from "../../src/API/apiEndpoints";

interface DocumentUpload<T = any> {
  documentName?: string;
  pageLink?: string;
  summary?: string;
  numQA?: number;
  tags?: string[];
  fileUploadResponse?: T;
  isDocumentUploaded?: boolean;
  qaList?: any[];
  question_guidance?: string;
  topic?: string;
  subTopic?: string;
}

export const submitDocument = async (document: DocumentUpload) => {
  if (!document) return null; // Early return if no document provided

  const payload = transformDataForApi(document);
  return apiRequest(API_ENDPOINTS.SUBMIT_DOCUMENT, "POST", payload);
};
