import axios from "axios";


const api = axios.create({
  baseURL: "/API/cloud_services",
  headers: {
    "Content-Type": "application/json",
  }
});
export const apiRequest = async (endpoint, method = "GET", data = {}, customHeaders = {}) => {
  try {
    const response = await api({
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
};
