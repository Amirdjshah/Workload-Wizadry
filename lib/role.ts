import axios from "axios";
import { IRole } from "./interfaces";

interface IRoleResponse {
    message: string;
    roles: IRole[];
}
interface IFacultyResponse {
    message: string;
    faculties: any[];
}

export const getAllRolesApi = (): Promise<{ data: IRoleResponse }> => {
  return axios.get(`/api/roles/`);
};
export const getAllFacultiesApi = (): Promise<{ data: IFacultyResponse }> => {
  return axios.get(`/api/faculty/`);
};
