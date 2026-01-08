import axios from "axios";

const http = axios.create({
  baseURL: "",
  headers: {
    Accept: "application/json",
  },
});

export default http;