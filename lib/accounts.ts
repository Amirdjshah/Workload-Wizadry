import axios, { AxiosResponse } from "axios";
import { API } from "./instance";

interface ICountries {
  count: number;
  results: {
    id: number;
    name: string;
  }[];
}

interface IStates {
  count: number;
  results: {
    id: number;
    name: string;
    country_id: number;
  }[];
}
const fetchAllCountry = (): Promise<AxiosResponse<ICountries>> =>
  API.get("/res.country");

const fetchSates = (): Promise<AxiosResponse<IStates>> =>
  API.get("/res.country.state");

const fetchBilling = (userId: string): Promise<AxiosResponse<IStates>> =>
  axios.get(`/api/company/${userId}/invoice`);

const fetchShipping = (userId: string): Promise<AxiosResponse<IStates>> =>
  axios.get(`/api/company/${userId}/delivery`);

const postShipping = (payload: any): Promise<AxiosResponse<IStates>> =>
  axios.post(`/api/company/${payload.userId}/delivery`, payload.body);

const postBilling = (payload: any): Promise<AxiosResponse<IStates>> =>
  axios.post(`/api/company/${payload.userId}/invoice`, payload.body);

export {
  fetchAllCountry,
  fetchSates,
  fetchBilling,
  fetchShipping,
  postBilling,
  postShipping,
};
