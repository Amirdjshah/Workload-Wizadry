import axios, { AxiosResponse } from "axios";
import { IAccessToken } from "../interfaces/dataInterface";
import { API } from "./instance";

export const login = (
  email: string,
  password: string
): Promise<{ data: IAccessToken }> => {
  return axios.post(`/api/login`, { email, password });
};

export const logoutUser = (): Promise<{ data: IAccessToken }> => {
  return axios.post(`/api/logout`);
};

export const signup = (data: any): Promise<{ data: IAccessToken }> => {
  return axios.post("/api/signup", {
    ...data,
  });
};

export const verifyToken = (
  verificationCode: string
): Promise<{ data: IAccessToken }> => {
  return axios.post("/api/verify", { verificationCode });
};

export const fetchProfile = (id: number, token: string) => {
  return axios.get(`/api/user/${id}?token=${token}`);
};

// export const fetchUsers = async () => {
//   const response: AxiosResponse = await API.get(`/res.users`);
//   return response.data;
// };

// export const fetchSingleUser = async (id: string) => {
//   const response: AxiosResponse = await API.get(`/res.users/${id}`);
//   return response.data;
// };

export const addUser = async (data: any) => {
  const response: AxiosResponse = await axios.post("/api/user", data);
  return response.data;
};

export const updateUser = async (data: any) => {
  const response: AxiosResponse = await axios.put("/api/user", data);
  return response.data;
};

export const forgetPassword = (email: string) => {
  return axios.post(`/api/password/forgot`, { email });
};

export const resetPassword = (
  password: string,
  token?: string | undefined | string[]
) => {
  if (typeof token !== "string" || token === undefined) {
    return Promise.reject("Invalid token");
  }
  return axios.post(`/api/password/reset`, {
    token,
    password,
  });
};

export const updateProfile = (data: any, id: string) => {
  //   return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
  //   return API.put(`/res.users/${id}`, data);
  return axios.post(`/api/user/${id}`, data);
};
