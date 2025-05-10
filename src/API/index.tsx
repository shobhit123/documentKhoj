import axios from "axios";
// import { BASE_URL } from "../helper/constants";

const api = axios.create({
  baseURL: "/API/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response || error.message);
    return Promise.reject(error);
  }
);

export default api;

