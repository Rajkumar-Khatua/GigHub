import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://gig-hub-server.vercel.app/api",
  withCredentials: true,
});

export default newRequest;