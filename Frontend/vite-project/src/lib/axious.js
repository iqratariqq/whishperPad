
import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-nu-five-33.vercel.app/api", 
  withCredentials: true,
});

export default api;
