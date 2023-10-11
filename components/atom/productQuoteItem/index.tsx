import React, { useContext, useState } from "react";
import { IOrderLine } from "../../../interfaces/dataInterface";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import Image from "next/image";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CommentOutlined } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
// import { removeQuotationApi } from "../../../lib";
import { useQueryClient } from "@tanstack/react-query";
import eventDispatcher from "../../utils/eventDispatcher";
import { AuthContext } from "../../context/authContext";

interface IProps {
  data: IOrderLine;
}
const ProductQuoteItem: React.FC<IProps> = ({ data }) => {
  const tax = data.tax_id;
  const { currency } = useContext(AuthContext);
  const taxName: string[] = tax?.map((item: any) => item.name);
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const scrollToElement = (id: string) => {
    const container = document.getElementById(id);
    container?.scrollIntoView({ behavior: "smooth" });
  };
  const productInfoHtmlCreate = () => {
    return `<p>Product Name: <a href="${window.location.origin}/product/${data.product_template_id}" rel="noopener noreferrer" target="_blank"><strong>${data.product_id?.name}</strong></a><strong> </strong>, Ordered Quantity: <strong>${data?.product_uom_qty} ${data?.product_uom?.name}, </strong>Provided Price per unit: <strong>${currency} ${data?.price_unit}</strong></p><p><br/></p>`;
  };
  const handleCommentClick = () => {
    scrollToElement("comment-input");
    eventDispatcher.dispatchEvent("addProductMessage", productInfoHtmlCreate());
  };

  const removeQuote = async (id: number) => {
    setLoading(true);
    try {
    //   const res = await removeQuotationApi(id);
      queryClient.invalidateQueries({ queryKey: ["fetch-single-order"] });
    } catch (err: any) {
      enqueueSnackbar({
        message: err?.message,
        variant: "error",
        className: "error-snackbar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container wrap="nowrap" paddingRight={2}>
      <Grid item width={100}>
        <Image
          height={100}
          width={100}
          alt="product-image"
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/web/image/product.template/${data.product_id.id}/image_1024/`}
        />
      </Grid>
      <Grid
        item
        flex={1}
        container
        direction={"column"}
        gap={1.4}
        paddingLeft={1.4}
      >
        <Link href={`/product/${data.product_template_id}`} target="_blank" style={{textDecoration: "none"}}>
          <Typography textTransform={"none"}>
            {data?.product_id?.name}
          </Typography>
        </Link>
        <Box flexDirection={"row"} display={"flex"}>
          <Typography
            color={"gray"}
            fontSize={14}
            width={"fit-content"}
            style={{ paddingRight: "1rem", borderRight: "1px lightgray solid" }}
          >
            {data?.product_id?.categ_id?.name}
          </Typography>
          <Typography color={"gray"} fontSize={14} paddingLeft={"1rem"}>
            {data?.product_id?.default_code}
          </Typography>
        </Box>
        <Grid item container gap={2}>
          <Button
            style={{
              textTransform: "none",
              borderRadius: "15px",
            }}
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            size={"small"}
            onClick={() => removeQuote(data?.id)}
            disabled={loading}
          >
            Remove Item
          </Button>
          <Button
            style={{
              textTransform: "none",
              borderRadius: "15px",
            }}
            variant="text"
            color="info"
            startIcon={<CommentOutlined />}
            onClick={handleCommentClick}
            size={"small"}
          >
            Add Comment
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export { ProductQuoteItem };
