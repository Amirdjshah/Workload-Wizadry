import React, { useContext, useEffect, useState } from "react";
import { CartItem, IProduct } from "../../interfaces/dataInterface";
import { useQuery } from "@tanstack/react-query";
import {
  CartInfo,
  addProductToCart,
  createCart,
  deleteCart,
  deleteProductFromCart,
  fetchCart,
  submitToQuote,
  updateProductOfCart,
} from "../../lib/cart";
import { AuthContext } from "./authContext";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/router";

interface ICartContext {
  isLoading: boolean;
  cartLoading: boolean;
  isOpen: boolean;
  setModel: (bool: boolean) => void;
  productList: CartItem[];
  addToCart: (id: number, qty: number) => void;
  deleteProduct: (id: number) => void;
  updateProduct: (pid: number, qty: number, cartItemId: number) => void;
  submitForQuote: () => void;
}

export const CartContext = React.createContext<ICartContext>({
  isLoading: false,
  cartLoading: false,
  isOpen: false,
  setModel: (bool: boolean) => false,
  productList: [],
  addToCart: () => {},
  deleteProduct: () => {},
  updateProduct: () => {},
  submitForQuote: () => {},
});

interface IProps {
  children: React.ReactNode;
}
const CartContextProvider: React.FC<IProps> = ({ children }) => {
  const [modalIsOpen, setModalVisibility] = useState(false);
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [cartInfo, setCartInfo] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [reload, setReload] = useState(1);
  const router = useRouter();
  const { user, accessToken } = useContext(AuthContext);

  useQuery({
    queryKey: ["Fetch cart", reload],
    queryFn: fetchCart,
    onSuccess: ({ data }) => {
      if (data.count > 0) {
        setCartInfo(data.results[0]);
        setCartData(data.results[0].cart_items);
      }
    },
  });

  const deleteCartProduct = (id: number) => {
    deleteProductFromCart(id).then(() => {
      enqueueSnackbar({
        message: "Product Item removed from cart",
        variant: "success",
        className: "success-snackbar",
      });
      setReload(reload + 1);
    });
  };
  const handleAddToCart = async (productId: number, qty: number) => {
    setLoading(true);
    let info;
    if (cartInfo) info = cartInfo;
    else {
      try {
        const res = await createCart(user?.partner_id?.id);
        info = res.data;
        setCartInfo(info);
        setCartData(info.cart_items || []);
      } catch (err) {
        setLoading(false);
      }
    }
    const payload: CartInfo = {
      userId: user?.partner_id?.id,
      cartId: info?.id,
      productId: productId,
      quantity: qty,
    };
    addProductToCart(payload)
      .then(() => {
        setReload(reload + 1);
        enqueueSnackbar({
          message: "Product added to cart",
          variant: "success",
          className: "success-snackbar",
        });
      })
      .catch(() => {
        enqueueSnackbar({
          message: "Some Error have occurred",
          variant: "error",
          className: "error-snackbar",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleUpdateProduct = (id: number, qty: number, itemId: number) => {
    setLoading(true);
    const payload: CartInfo = {
      cartId: cartInfo?.id,
      productId: id,
      quantity: qty,
      userId: user?.partner_id?.id,
      cartItemId: itemId,
    };
    updateProductOfCart(payload)
      .then(() => {
        setReload(reload + 1);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmitToQuote = () => {
    // setCartLoading(true);
    // submitToQuote(
    //   {
    //     partner_id: user?.partner_id?.id,
    //     order_line: cartData.map((item) => ({
    //       product_id: item.product_id.product_variant_id.id,
    //       customer_lead: 0,
    //       name: item.product_id.name,
    //       product_uom_qty: item.quantity,
    //       price_unit: 0,
    //     })),
    //     email: user?.email,
    //   },
    //   accessToken?.access_token
    // )
    //   .then(() => {
    //     return deleteCart(cartInfo?.id);
    //   })
    //   .then(() => {
    //     setReload(reload + 1);
    //     enqueueSnackbar({
    //       message: "Cart submitted for quote!",
    //       variant: "success",
    //       className: "success-snackbar",
    //     });
    //     setCartData([]);
    //     setCartInfo(null);
    //     setModalVisibility(false);
    //     router.push("/quotes");
    //   })
    //   .finally(() => {
    //     setCartLoading(false);
    //   });
  };

  return (
    <CartContext.Provider
      value={{
        isLoading: loading,
        productList: cartData,
        addToCart: handleAddToCart,
        deleteProduct: deleteCartProduct,
        isOpen: modalIsOpen,
        setModel: (bool: boolean) => setModalVisibility(bool),
        updateProduct: handleUpdateProduct,
        submitForQuote: handleSubmitToQuote,
        cartLoading: cartLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContextProvider };
