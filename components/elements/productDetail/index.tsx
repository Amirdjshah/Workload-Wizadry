import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ButtonIncrementDecrement,
  ProductDescription,
  ProductVariants,
} from "../../atom";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./style.module.scss";
import { IProduct } from "../../../interfaces/dataInterface";
import { FavoriteContext } from "../../context/favoriteContext";
import { CartContext } from "../../context/cartContext";
import { enqueueSnackbar } from "notistack";
import { ImageMagnifier } from "./magnifier";
import { ImageModal } from "./modal";
import { PRIMARY_COLOR } from "@config/cssVariables";
import { StatusPill } from "../satusPill";
import { getStockOptions } from "../../utils";

interface IProductDetailProps {
  data?: IProduct;
}

const ProductDetail: React.FC<IProductDetailProps> = ({ data }) => {
  const {
    addToFavoriteProduct,
    removeFromFavoriteProduct,
    productList: favProductList,
  } = useContext(FavoriteContext);
  const { addToCart, isLoading, updateProduct, productList } =
    useContext(CartContext);
  const [qty, setQty] = useState(1);
  const [isCurrentProductInCart, setIsCurrentProductInCart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateCartQuantity = () => {
    let cartItem = productList.find((item) => item.product_id.id === data?.id);
    if (cartItem) {
      data?.id && updateProduct(data?.id, qty, cartItem.id);
    }
  };

  const handleAddToCart = () => {
    if (productList.find((item) => item.product_id.id === data?.id)) {
      handleUpdateCartQuantity();
      enqueueSnackbar({
        message: "Successfully Updated Cart",
        variant: "success",
        className: "success-snackbar",
      });
    } else {
      data?.id && addToCart(data?.id, qty);
    }
  };

  useEffect(() => {
    const findProduct = productList.find(
      (item) => item.product_id.id === data?.id
    );
    if (findProduct) {
      setQty(findProduct?.quantity);
      setIsCurrentProductInCart(true);
    }
  }, [productList]);

  const showHideModal = () => {
    setShowModal(!showModal);
  };

  const thumbnailImages: any = data?.product_template_image_ids?.map(
    (item: any) => {
      return {
        src: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/web/image/product.image/${item?.id}/image_1024/`,
      };
    }
  );

  const allImages = [
    {
      src: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/web/image/product.template/${data?.id}/image_1024/`,
    },
    ...thumbnailImages,
  ];

  return (
    <Grid container className={styles.productDetail}>
      <ImageModal
        onClose={() => setShowModal(!showModal)}
        open={showModal}
        images={allImages}
      />

      <Grid sm={12} lg={5} marginBottom={4}>
        <Grid container flexDirection={"column"}>
          <Grid item xs={12}>
            <ImageMagnifier
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/web/image/product.template/${data?.id}/image_1024/`}
              width={"100%"}
              height={"auto"}
              magnifierHeight={250}
              magnifierWidth={250}
              zoomLevel={1}
              onClick={showHideModal}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              gap={4}
              flexDirection={"column"}
              overflow={"scroll"}
              maxWidth={"100%"}
              maxHeight={"120px"}
            >
              {data?.product_template_image_ids?.map((item: any) => {
                return (
                  <Grid item>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/web/image/product.image/${item?.id}/image_1024/`}
                      height="100px"
                      width="100px"
                      onClick={showHideModal}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid sm={12} lg={6} paddingX={3}>
        <div className={styles.headerSection}>
          <Grid
            container
            gap={1}
            flexDirection="column"
            alignItems={"flex-start"}
          >
            <Typography variant="h5" fontFamily={"sans-serif"} fontWeight={600}>
              {data?.display_name}
            </Typography>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"baseline"}
            >
              {!favProductList.find(
                (item) => item.product_id.id === data?.id
              ) ? (
                <Button
                  variant="text"
                  className="fav-icon"
                  style={{ minWidth: "min-content", marginTop: "10px" }}
                  startIcon={<FavoriteBorderIcon />}
                  onClick={(e) => {
                    e.preventDefault();
                    if (data?.id) {
                      addToFavoriteProduct(data?.id);
                    }
                  }}
                >
                  Add To Favorite
                </Button>
              ) : (
                <Button
                  variant="text"
                  className="fav-icon"
                  style={{ minWidth: "min-content", marginTop: "10px" }}
                  startIcon={<FavoriteIcon />}
                  onClick={(e) => {
                    let p = favProductList.find(
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
              <Grid
                item
                container
                marginBottom={3}
                maxWidth={"fit-content"}
                padding="0.5rem 0.5rem"
              >
                <StatusPill
                  options={getStockOptions(data?.qty_available || 0) as any}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
        {/* <div className={styles.variantSection}>
          <ProductVariants />
        </div> */}
        <div className={styles.productDescription}>
          <ProductDescription
            attribute={data?.attribute_line_ids || []}
            description={data?.description_sale}
          />
        </div>
        <div className={styles.quantitySection}>
          <Typography variant="body1" marginBottom={1}>
            Quantity
          </Typography>
          <ButtonIncrementDecrement value={qty} onChange={(v) => setQty(v)} />
        </div>
        <div className={styles.actionBarSection}>
          <Button
            startIcon={<CartIcon />}
            isLoading={isLoading}
            disabled={!data?.id}
            onClick={() => data?.id && handleAddToCart()}
          >
            {isCurrentProductInCart ? "Update Cart" : "Add To Cart"}
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};
export { ProductDetail };
