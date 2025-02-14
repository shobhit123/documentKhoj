import axios from "axios";

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://wealthuat.hdfcbank.com/UATEOL/API/cloud_services",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Generic method for making API calls
  async request(endpoint, method = "GET", data = {}, customHeaders = {}) {
    try {
      const response = await this.api({
        url: endpoint,
        method,
        data,
        headers: {
          ...customHeaders,
        },
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response || error.message);
      throw error;
    }
  }

  // Specific method for file upload API
  async uploadFile(fileBase64, fileName, mimeType) {
    const endpoint = "/upload_object";
    const payload = {
      file_base64: fileBase64,
      file_name: fileName,
      mime_type: mimeType,
    };

    return this.request(endpoint, "POST", payload, {
      Cookie: "TS01d8a58c=0144482a020e0d3109cf3fd4a86d3b737ca8bc5fdabbfdade1a96263a33067f32187ddf1dfdfab637bb042e69f257831d74ed6fffa",
    });
  }
}

const apiService = new ApiService();
export default apiService;
