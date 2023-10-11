import axios from "axios";
import { CartItem, ICart, IOrderLine } from "../interfaces/dataInterface";
import { API } from "./instance";

interface Customer {
  id: number;
  display_name: string;
}

interface ICreateCartResponse {
  cart_items: CartItem[];
  create_date: string;
  customer_id: Customer;
  display_name: string;
  id: number;
  write_date: string;
  __last_update: string;
}

export const createCart = (
  customerId: string
): Promise<{ data: ICreateCartResponse }> => {
  return API.post(`my_cart.cart/?customer_id=${customerId}`);
};

export const deleteCart = (id: string) => {
  return API.delete(`/my_cart.cart/${id}`);
};

export interface CartInfo {
  userId: number;
  cartId: number;
  productId: number;
  quantity: number;
  cartItemId?: number;
}

export const addProductToCart = (args: CartInfo) => {
  return API.post(
    `my_cart.cart_item?customer_id=${args.userId}&cart_id=${args.cartId}&product_id=${args.productId}&quantity=${args.quantity}`
  );
};

export const fetchCart = (): any => API.get("/my_cart.cart");

export const updateProductOfCart = (args: CartInfo) => {
  return API.put(
    `my_cart.cart_item/${args.cartItemId}?customer_id=${args.userId}&cart_id=${args.cartId}&product_id=${args.productId}&quantity=${args.quantity}`
  );
};

export const deleteProductFromCart = (cartItemId: number) => {
  return API.delete(`my_cart.cart_item/${cartItemId}`);
};

interface IArgs {
  partner_id: string;
  email: string;
  order_line: {
    product_id: number;
    customer_lead: number;
    name: string;
    product_uom_qty: number;
    price_unit: number;
  }[];
}
export const submitToQuote = (args: IArgs, token: string = "") => {
  return axios.post(`/api/order/post?token=${token}`, args);
};

interface IApproveQuote {
  user_id: number;
  order_id: string;
  datetime: string;
  request_id?: string;
  requester_name?: string;
  date?: string;
  approver_name?: string;
  approval_date?: string;
  requested_on?: string;
  requester_email?: string;
  company_name?: string;
  order_name?: string;
  company_id?: number | undefined;
  approved_by?: any
}
export const approveQuote = (payload: IApproveQuote, token: any) => {
  return axios.post(`/api/quote/approve?token=${token}`, {
    ...payload,
  });
};
