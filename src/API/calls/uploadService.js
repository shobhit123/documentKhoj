import { apiRequest } from "../../Document/API";

export const uploadFileService = async (fileBase64, fileName, mimeType) => {
  const endpoint = "cloud_services/upload_object";
  const payload = {
    file_base64: fileBase64,
    file_name: fileName,
    mime_type: mimeType,
  };

  return apiRequest(endpoint, "POST", payload);
};
