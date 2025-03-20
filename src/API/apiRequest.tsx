import api from "./index"; // Import pre-configured Axios instance
// import { BASE_URL } from "../helper/constants";

export const apiRequest = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
  customHeaders: Record<string, string> = {}
) => {
  try {
    const response = await api({
      method,
      // url:  `${BASE_URL}${endpoint}`,
      url: endpoint,
      headers: {
        ...customHeaders,
      },
      data: method !== "GET" ? data : undefined, // Send body only for non-GET requests
      params: method === "GET" ? data : undefined, // Use query params for GET requests
    });

    return response.data ;
  } catch (error: any) {
    console.error("API Request Error:", error?.response?.status || "Unknown Status", error);
    return null;
  }
};
