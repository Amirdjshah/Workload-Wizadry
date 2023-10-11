import { Chip, Grid, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { CartItem } from "../../../interfaces/dataInterface";
import DeleteIcon from "@mui/icons-material/Delete";
import { AlertDialog, Button, ButtonIncrementDecrement } from "../../atom";
import { CartContext } from "../../context/cartContext";
import { useRouter } from "next/router";
import styles from "./syle.module.scss";
import { AutoFixOffTwoTone } from "@mui/icons-material";
import { FavoriteContext } from "../../context/favoriteContext";

interface IProps {
  data: CartItem;
}

interface ICartProductDetail {
  id: string;
  count: number;
  src?: string;
  name: string;
  createdAt: string;
}

const CartProductItem: React.FC<IProps> = ({ data }) => {
  const { deleteProduct, updateProduct, setModel } = useContext(CartContext);
  const { addToFavoriteProduct, productList, removeFromFavoriteProduct } =
    useContext(FavoriteContext);
  const [deleteId, setDeleteId] = useState(-1);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(data.quantity);
  const router = useRouter();
  useEffect(() => {
    updateProduct(data?.product_id.id, count, data.id);
  }, [count]);

  const handleUpdateProduct = (qty: number) => {
    setCount(qty);
    updateProduct(data?.product_id.id, qty, data.id);
  };
  return (
    <Grid container marginBottom={0} className={styles.cartItem}>
      <AlertDialog
        handleClose={() => setOpen(false)}
        open={open}
        message={"Do you want to delete this cart item?"}
        loading={false}
        handleConfirm={() => {
          if (deleteId < 0) return;
          deleteProduct(deleteId);
          setDeleteId(-1);
          setOpen(false);
        }}
      />
      <Grid item flexGrow={1}>
        <Grid container justifyContent={"center"} marginBottom={0}>
          <Grid item sm={12}>
            <Grid container marginTop={1} flexDirection={"row"}>
              <Grid item sm={"auto"}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/web/image/product.template/${data.product_id.id}/image_1024/`}
                  height={160}
                  width={160}
                  alt={""}
                />
              </Grid>
              <Grid item flexGrow={1} marginLeft={2}>
                <Grid
                  container
                  flexDirection={"column"}
                  height={"100%"}
                  gap={2}
                  justifyContent={"start"}
                >
                  <Grid item container>
                    <Typography
                      fontFamily={"sans-serif"}
                      fontWeight={"bold"}
                      maxWidth={500}
                      fontSize={16}
                      noWrap={true}
                    >
                      {data?.product_id.name}
                    </Typography>
                  </Grid>
                  <Grid container>
                    <Chip
                      label={`Category Name: ${data?.product_id.categ_id.name}`}
                      onClick={() => {
                        router.push(
                          `/product?cat=${data?.product_id?.categ_id?.name}`
                        );
                        setModel(false);
                      }}
                      size="small"
                      variant="filled"
                      style={{ width: "fit-content" }}
                    />
                    <Chip
                      label={`Quantity: ${count} units`}
                      size="small"
                      variant="filled"
                      style={{ width: "fit-content", marginLeft: "0.5rem" }}
                    />
                  </Grid>
                  <Grid container>
                    {!productList.find(
                      (item) => item.product_id.id === data?.product_id?.id
                    ) ? (
                      <Button
                        variant="text"
                        size="small"
                        className="fav-icon"
                        style={{ minWidth: "min-content" }}
                        startIcon={<FavoriteBorderIcon />}
                        onClick={(e) => {
                          e.preventDefault();
                          if (data?.id) {
                            addToFavoriteProduct(data?.product_id?.id);
                          }
                        }}
                      >
                        Add To Favorite
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="text"
                        className="fav-icon"
                        style={{ minWidth: "min-content" }}
                        startIcon={<FavoriteIcon />}
                        onClick={(e) => {
                          let p = productList.find(
                            (item) => item.product_id.id === data?.id
                          );
                          if (p?.id) {
                            removeFromFavoriteProduct(p.id);
                          }
                        }}
                      >
                        Remove From Favorite
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                alignContent={"center"}
                display={"flex"}
                alignItems={"left"}
                flexDirection={"column"}
                justifyContent={"center"}
                marginRight={6}
              >
                <Typography fontWeight={400} fontSize={14} paddingBottom={1}>
                  Product Quantity
                </Typography>
                <ButtonIncrementDecrement
                  value={count}
                  onChange={(v) => handleUpdateProduct(v)}
                />
              </Grid>
              <Grid item justifySelf={"flex-end"} alignSelf={"center"}>
                <Button
                  startIcon={<DeleteIcon />}
                  style={{ marginBottom: "-1.45rem" }}
                  onClick={() => {
                    setDeleteId(data.id);
                    setOpen(true);
                  }}
                  variant="outlined"
                  color="error"
                >
                  Remove from Cart
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export { CartProductItem };
