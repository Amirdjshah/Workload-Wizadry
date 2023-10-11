import React, { useContext, useEffect, useState } from "react";
import { IFavoriteItem } from "../../interfaces/dataInterface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { AuthContext } from "./authContext";

interface IFavoriteContext {
  isLoading: boolean;
  productList: IFavoriteItem[];
  addToFavoriteProduct: (id: number) => void;
  removeFromFavoriteProduct: (id: number) => void;
}
export const FavoriteContext = React.createContext<IFavoriteContext>({
  isLoading: false,
  productList: [],
  addToFavoriteProduct: (id: number) => {},
  removeFromFavoriteProduct: (id: number) => {},
});

interface IProps {
  children: React.ReactNode;
}

const FavoriteContextProvider: React.FC<IProps> = ({ children }) => {
  const [reload, setReload] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["Favorite Products", reload],
    // queryFn: fetchFavoriteProduct,
    // select: (res) => res.data,
  });
  const { user } = useContext(AuthContext);
  const { mutate } = useMutation({
    // mutationFn: addToFavoriteProduct,
    onSuccess: (data) => {
      enqueueSnackbar({
        message: "Product Added to Favorite",
        variant: "success",
        className: "success-snackbar",
      });
      setReload(reload + 1);
    },
  });

  const handleRemoveFromFavoriteProduct = (id: number) => {
    // removeFromFavorite(id)
    //   .then(() => {
    //     enqueueSnackbar({
    //       message: "Product removed from favorite product",
    //       variant: "success",
    //         className: "success-snackbar",

    //     });
    //     setReload(reload + 1);
    //   })
    //   .catch(() => {
    //     enqueueSnackbar({
    //       message: "Some Error have occurred",
    //       variant: "error",
    //         className: "error-snackbar",
    //     });
    //   });
  };

  const handleAddToFavorite = (productId: number) => {
    // return mutate({
    //   pid: productId,
    //   uid: user?.partner_id?.id,
    // });
  };
//   let favData = [];
//   if (!Array.isArray(data?.results)) {
//     favData = [];
//   }
  return (
    <FavoriteContext.Provider
      value={{
        isLoading: isLoading,
        productList: [] as any,
        addToFavoriteProduct: handleAddToFavorite,
        removeFromFavoriteProduct: handleRemoveFromFavoriteProduct,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export { FavoriteContextProvider };
