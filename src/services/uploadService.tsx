import { API_ENDPOINTS } from "src/API/apiEndpoints";
import { apiRequest } from "../../src/Document/API";

export const uploadFileService = async (
  fileBase64: string,
  fileName: string,
  mimeType: string
) => {
  const payload = {
    file_base64: fileBase64,
    file_name: fileName,
    mime_type: mimeType,
  };

  return apiRequest(API_ENDPOINTS.UPLOAD_OBJECT, "POST", payload);
};
