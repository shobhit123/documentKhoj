import axios from "axios";
import { BASE_URL } from "../helper/constants";


const api = axios.create({
  baseURL: "/API/",
  headers: {
    "Content-Type": "application/json",
  }
});
export const apiRequest = async (endpoint, method = "GET", data = {}, customHeaders = {}) => {
  try {
    const response = await api({
      url:  `${BASE_URL}${endpoint}`,
      method,
      data,
      headers: {
        ...customHeaders,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error?.response || error?.message);
  }
};
