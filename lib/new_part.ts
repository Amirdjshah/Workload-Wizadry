import { AxiosResponse } from "axios";
import { API } from "./instance";

export const fetchNewPart = async () => {
  const data: AxiosResponse = await API.get("/new_part.new_part/");
  return data?.data;
};

export const createNewPart = async (data: any) => {
  const response: AxiosResponse = await API.post(`/new_part.new_part/`, data);
  return response.data;
};
