import axios from "axios";
import { BACKEND_URL } from "./utils";

const axiosClient = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
