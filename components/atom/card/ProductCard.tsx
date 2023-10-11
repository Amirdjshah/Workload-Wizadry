import React, { useContext } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { Button } from "../button";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/router";
import { FavoriteContext } from "../../context/favoriteContext";
import { CartContext } from "../../context/cartContext";
import { ButtonIncrementDecrement } from "../buttonIncrementDecrement";
import { IProps } from "./product";
import { Grid } from "@mui/material";
import { StatusPill } from "../../elements/satusPill";
import { getStockOptions } from "../../utils";

export const ProductCard = ({ hit }: IProps) => {
  const router = useRouter();
  const { removeFromFavoriteProduct, addToFavoriteProduct, productList } =
    useContext(FavoriteContext);
  const {
    addToCart,
    productList: cartList,
    updateProduct,
  } = useContext(CartContext);
  const productCartDetail = cartList.find(
    (item) => item.product_id.id === hit.id
  );
  const handleAddToCart = (id: number) => {
    addToCart(id, 1);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.contentBox}>
        <Image
          className={styles.placeholderPicture}
          alt=""
          width={220}
          height={255}
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/web/image/product.template/${hit.id}/image_1024/`}
        />
        <div className={styles.content}>
          <div
            className={styles.title}
            onClick={() => router.push(`/product/${hit.id}`)}
            title={hit?.name}
            style={{ fontWeight: "bold" }}
          >
            {hit?.name}
          </div>
          <div
            className={styles.title}
            onClick={() => router.push(`/product/${hit.id}`)}
            title={hit?.name}
            style={{ fontStyle: "italic", height: "2rem", color: "gray" }}
          >
            {hit?.default_code}
          </div>
          <div className={styles.buttonSection}>
            {productList.find((item) => item.product_id.id === hit.id) ? (
              <Button
                variant="text"
                className="fav-icon"
                style={{ minWidth: "min-content" }}
                startIcon={<FavoriteIcon />}
                onClick={(e) => {
                  let p = productList.find(
                    (item) => item.product_id.id === hit.id
                  );
                  if (p?.id) {
                    removeFromFavoriteProduct(p.id);
                  }
                }}
              />
            ) : (
              <Button
                variant="text"
                className="fav-icon"
                style={{ minWidth: "min-content" }}
                startIcon={<FavoriteBorderIcon />}
                onClick={(e) => {
                  addToFavoriteProduct(hit.id);
                }}
              />
            )}
            {productCartDetail ? (
              <ButtonIncrementDecrement
                value={productCartDetail.quantity}
                size={"small"}
                width="1rem"
                onChange={function (value: number): void {
                  updateProduct(
                    productCartDetail.product_id.id,
                    value,
                    productCartDetail.id
                  );
                }}
              />
            ) : (
              <Button
                variant="text"
                startIcon={<CartIcon />}
                onClick={() => handleAddToCart(hit.id)}
              >
                Add To Cart
              </Button>
            )}
          </div>
          <Grid
            item
            container
            marginBottom={3}
            maxWidth={"fit-content"}
            padding="0.5rem 0.5rem"
          >
            <StatusPill
              options={getStockOptions(hit?.qty_available || 0) as any}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};
