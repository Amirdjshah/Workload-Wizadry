import axios from "axios";

export const getConfigApi = (): Promise<{ data: any }> => {
  return axios.get(`/api/config`);
};
