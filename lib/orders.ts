import axios, { AxiosResponse } from "axios";
import { IOrder, IOrderResponse } from "../interfaces/dataInterface";
import { API } from "./instance";

export const fetchAllOrder = ({ queryKey }: any): Promise<IOrderResponse> => {
  const date = queryKey?.[1];
  const route = date
    ? `/sale.order?filters=[("create_date", ">=", "${date}")]`
    : `/sale.order/?filters=[("state", "in", ["sale", "done", "cancel"])]`;
  return API.get(route);
};

export const fetchAllRfq = (queryFn: any): Promise<IOrderResponse> => {
  return API.get(`/sale.order`);
};

export const fetchSingleOrder = ({
  queryKey,
}: any): Promise<AxiosResponse<{ data: IOrder }>> => {
  const id = queryKey[1];
  if (!id) {
    return Promise.reject(new Error("Order id is required"));
  }
  const user_id = queryKey?.[2];
  const partner_id = queryKey?.[3];
  let api = `/api/order/${id}/get`;
  if (user_id) {
    api = `${api}?user_id=${user_id}&partner_id=${partner_id}`;
  }
  return axios.get(api);
};

interface IOrderConfirmed {
  requester_name: string;
  request_id: string;
  date: string;
  total_amount: string;
  delivery_date: string;
  display_name: string;
  email_to: string;
}

export const createOrder = (id: string, data: IOrderConfirmed) =>
  axios.post(`/api/order/${id}/confirm`, data);

export const downloadInvoice = (id: string) => axios.get(`/api/invoice/${id}`);

export const getDeliveryInformation = ({ queryKey }: any) => {
  const id = queryKey[1];
  return API.get(`stock.picking/?filters=[('sale_id', '=', ${id})]`);
};

export const updateRfqQty = (orderLineId: number, qty: string) =>
  API.put(`/sale.order.line/${orderLineId}/`, {
    product_uom_qty: qty,
    price_unit: 0,
  });

export const downloadQuotation = (id: string) =>
  API.get(
    `/report/get_pdf?report_name=sale.action_report_saleorder&ids=[${id}]`
  );

export const downloadOrder = (id: string): any =>
  API.get(
    `report/get_pdf?&ids=[${id}]`
  );

export const removeQuotationApi = (id: number) =>
  API.delete(`/sale.order.line/${id}/`);

export const rejectQuotation = (payload: any, token: string = "") =>
  axios.post(`/api/quote/reject?token=${token}`, payload);

export const sendMessage = (
  id: string,
  message: string,
  accessToken: string,
  image: any,
  fileName: string
) => {
  return axios.post(`/api/message/send/${id}?token=${accessToken}`, {
    body: message,
    file_name: fileName,
    attachment: image,
  });
};

export const uploadFile = (id: string, data: any) =>
  API.put(`/sale.order/${id}`, data);

export const updateOrder = (id: string, data: any) =>
  API.put(`/sale.order/${id}`, data);

export const confirmQuotation = (id: any, token: any, company_id: any) =>
  axios.post(
    `/api/quote/${id}/confirm?token=${token}&company_id=${company_id}`
  );

export const fetchAttachments = (ids: string[]) => {
    // if ids
    if(ids && ids.length > 0){
        return axios.get(`/api/attachments?invoice_ids=${ids.join(",")}`);
    }
    return Promise.resolve({data: []});
};

export const getMessages = ({ queryKey }: any) => {
  const id = queryKey[1];
  return axios.get(`/api/message/${id}/get`);
};
