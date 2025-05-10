import { API_ENDPOINTS } from "src/api/apiEndpoints";
import { apiRequest } from "src/api/apiRequest";

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
