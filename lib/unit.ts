import axios from "axios";

export const getUnitApi = (): Promise<{ data: any }> => {
  return axios.get(`/api/units`);
};
