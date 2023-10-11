"use-client";
import axios from "axios";
import { IAccessToken } from "../interfaces/dataInterface";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

API.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("access_token");
    if (!token) return config;
    const data = JSON.parse(token) as IAccessToken;
    if (config.method === "options") {
      delete config.headers["Access-Token"];
      return config;
    }
    // config.headers["Access-Token"] = data ? data.access_token : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // TODO: signout
    }
    return Promise.reject(error.response);
  }
);

export { API };
