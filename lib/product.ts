import { useContext } from "react";
import { IFavoriteResponse, IProduct } from "../interfaces/dataInterface";
import { API } from "./instance";
import { AuthContext } from "../components/context/authContext";
import axios, { AxiosResponse } from "axios";

const MOCK = {
  id: 23,
  name: "Acoustic Bloc Screens",
  display_name: "Acoustic Bloc Screens",
  active: true,
  type: "product",
  list_price: 295.0,
  taxes_id: null,
  standard_price: 0.0,
  categ_id: {
    id: 8,
    name: "Office Furniture",
  },
  description: null,
  default_code: null,
  attribute_line_ids: [
    {
      id: 6,
      display_name: "Legs",
      value_count: 2,
      value_ids: [
        {
          id: 1,
          name: "Steel",
          display_name: "Legs: Steel",
        },
        {
          id: 2,
          name: "Aluminium",
          display_name: "Legs: Aluminium",
        },
      ],
    },
    {
      id: 5,
      display_name: "Color",
      value_count: 1,
      value_ids: [
        {
          id: 3,
          name: "White",
          display_name: "Color: White",
        },
      ],
    },
    {
      id: 9,
      display_name: "Size",
      value_count: 1,
      value_ids: [
        {
          id: 8,
          name: "20 X 20 X 20 Inch",
          display_name: "Size: 20 X 20 X 20 Inch",
        },
      ],
    },
  ],
  purchase_method: "receive",
  cost_currency_id: 2,
  priority: "1",
  product_variant_id: [
    {
      id: 44,
      display_name: "Acoustic Bloc Screens (Aluminium)",
    },
  ],
};

export const fetchProduct = ({
  queryKey,
}: any): Promise<AxiosResponse<IProduct>> => {
  if (!queryKey?.[1]) return Promise.reject();
  return axios.get(`/api/product/${queryKey?.[1] || ""}`);
};

const MOCK_FAVORITE_PRODUCT: IFavoriteResponse = {
  count: 2,
  results: [
    {
      id: 12,
      display_name: "product.wishlist,12",
      product_id: {
        id: 5,
        name: "Office Chair",
        type: "product",
        barcode: null,
        categ_id: {
          id: 8,
          name: "Office Furniture",
        },
        attribute_line_ids: [],
      },
    },
    {
      id: 22,
      display_name: "product.wishlist,22",
      product_id: {
        id: 23,
        name: "Conference Chair",
        type: "product",
        barcode: null,
        categ_id: {
          id: 8,
          name: "Office Furniture",
        },
        attribute_line_ids: [
          {
            id: 3,
            display_name: "Legs",
          },
        ],
      },
    },
  ],
};
export const fetchFavoriteProduct = (
  queryFn: any
): Promise<AxiosResponse<IFavoriteResponse>> => {
  return API.get("/my_wishlist.wishlist");
};

interface Args {
  pid: number;
  uid: number;
}
export const addToFavoriteProduct = (args: Args) => {
  return API.post(
    `/my_wishlist.wishlist/?product_id=${args.pid}&customer_id=${args.uid}`
  );
};

export const removeFromFavorite = (id: number) => {
  return API.delete(`/my_wishlist.wishlist/${id}`);
};

export const fetchCategories = () => {
  return API.get("product.category/");
};
