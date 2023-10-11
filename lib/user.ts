import axios from "axios";
import { IUser } from "./interfaces";

export const getUsersApi = (): Promise<{ data: IUser }> => {
  return axios.get(`/api/users/me`);
};
export const approveUserApi = ({ id }: any): Promise<{ data: IUser }> => {
  return axios.post(`/api/users/approve/${id}`);
};
export const rejectUserApi = ({ id }: any): Promise<{ data: IUser }> => {
  return axios.post(`/api/users/reject/${id}`);
};
export const deleteUserApi = ({id}: any): Promise<{ data: IUser }> => {
  return axios.post(`/api/users/delete/${id}`);
};

export const getAllUsersApi = (): Promise<{ data: any }> => {
  return axios.get(`/api/users`);
};
