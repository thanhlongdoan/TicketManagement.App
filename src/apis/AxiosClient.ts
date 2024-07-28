import axios from "axios";
import queryString from "query-string";

export const axiosClient = axios.create({
  baseURL: "https://localhost:7156",
  headers: {
    "content-type": "multipart/form-data",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
// Set interceptors requests
axiosClient.interceptors.request.use(
  async (config) => config,
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle errors
    throw error?.response?.data?.status === 400 ? error?.response?.data?.data : error?.response?.data;
  },
);
