import axios from "axios";
import { IUser } from "./interfaces";

export const postWorkloadApi = (data: any): Promise<{ data: any }> => {
  return axios.post(`/api/workload`, data);
};
export const editWorkloadAPi = (data: any): Promise<{ data: any }> => {
  return axios.post(`/api/workload/${data?.id}`, data);
};
export const deleteWorkloadApi = (id: any): Promise<{ data: any }> => {
  return axios.delete(`/api/workload/${id}`);
};
export const acceptWorkloadApi = ({ id }: any): Promise<{ data: any }> => {
  return axios.post(`/api/workload/accept/${id}`);
};
export const rejectWorkloadApi = (data: any): Promise<{ data: any }> => {
  return axios.post(`/api/workload/reject/${data?.id}`, data);
};
export const getWorkloadApi = (f: string | null): Promise<{ data: any }> => {
    if(f){
        return axios?.get(`/api/workload?type=${f}`)
    }
  return axios.get(`/api/workload`);
};
export const getWorkloadSingleApi = (id: string): Promise<{ data: any }> => {
  return axios.get(`/api/workload/${id}`);
};
