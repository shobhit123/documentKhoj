import axios from "axios";
import { BASE_URL } from "../helper/constants";


const api = axios.create({
  baseURL: "/API/",
  headers: {
    "Content-Type": "application/json",
  }
});
export const apiRequest = async (endpoint: string, method = "GET", data = {}, customHeaders = {}) => {
  try {
    const response = await api({
      // url:  `${BASE_URL}${endpoint}`,
      url:  `${endpoint}`,
      method,
      data,
      headers: {
        ...customHeaders,
      },
    });
    return response.data;
  } catch (error:any) {
    console.error("API Error:", error?.response || error?.message);
  }
};
