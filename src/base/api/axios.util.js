import axios from "axios";
import { AuthTokenHandler } from "./auth-token.util";
// const BASE_URL = "https://jsonplaceholder.typicode.com";
// baseURL: BASE_URL,
const AxiosInstance = axios.create({});
AxiosInstance.interceptors.request.use((req) => {
  const accessToken = AuthTokenHandler.getAccessToken();

  if (accessToken) {
    req.headers.Authorization = `${accessToken || ""}`;
  }

  return req;
});
AxiosInstance.interceptors.response.use(
  (res) => {
    // console.log(res.config, res.headers, res);
    if (res.headers["x-auth-token"]) {
      AuthTokenHandler.setAccessToken(res.headers["x-auth-token"]);
    }
    return res.data;
  },
  (err) => {
    // if (isSSR) return { err, data: {} };
    throw err;
  }
);
export const axiosInstance = AxiosInstance;
