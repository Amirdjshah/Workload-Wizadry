import { Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { StatusPill } from "../../elements/satusPill";
import Image from "next/image";
import { IOrderLine } from "../../../interfaces/dataInterface";
import Link from "next/link";
import { Button } from "../../atom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AuthContext } from "../../context/authContext";

interface IProps {
  data: IOrderLine;
  created_at: string;
  status: string;
}

export interface IOrderProductDetail {
  id: string;
  count: number;
  pricePerItem: number;
  src?: string;
  name: string;
  status: "Dispatched" | "Delivered" | "Approved";
  createdAt: string;
}
const DeliveryStatus: any = {
  full: {
    color: "primary",
    label: "Out For Delivery",
  },
  pending: {
    color: "primary",
    label: "Progress",
  },
  partial: {
    color: "primary",
    label: "Partial",
  },
  default: {
    color: "default",
    label: "Unknown",
  },
};

const OrderProductItem: React.FC<IProps> = ({ data, created_at, status }) => {
  const [viewDetail, setViewDetail] = useState(false);
  const { currency } = useContext(AuthContext);

  const getDeliveryStatus = (qty: number, qty_d: number): any => {
    let color = "primary";
    let delivery_status = "Draft";
    if (qty_d === 0) {
      delivery_status = "Progress";
      color = "primary";
    } else if (qty_d > 0 && qty_d < qty) {
      delivery_status = "Partial";
      color = "primary";
    }
    if (qty_d === qty) {
      delivery_status = "Out For Delivery";
      color = "primary";
    }
    return { label: delivery_status, color };
  };

  return (
    <Grid container maxWidth={"100%"}>
      <Grid item flexGrow={1}>
        <Grid container justifyContent={"space-between"}>
          <Grid item flexGrow={1}>
            <Grid
              container
              marginBottom={2}
              width={"100%"}
              wrap="nowrap"
              justifyContent={"space-between"}
            >
              <Grid container>
                <Typography color={"gray"} marginRight={2}>
                  {`#${data?.id?.toString()}`}
                </Typography>
                <StatusPill
                  options={getDeliveryStatus(
                    data?.product_uom_qty,
                    data?.qty_delivered
                  )}
                />
              </Grid>
            </Grid>
            <Grid container marginTop={1} flexDirection={"row"}>
              <Grid item sm={"auto"}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/web/image/product.template/${data?.product_template_id}/image_1024/`}
                  height={80}
                  width={80}
                  alt={""}
                />
              </Grid>
              <Grid
                item
                flexGrow={1}
                marginLeft={2}
                justifyContent={"space-between"}
              >
                <Grid
                  container
                  flexDirection={"column"}
                  height={"100%"}
                  wrap="nowrap"
                  justifyContent={"space-between"}
                >
                  <Link href={`/product/${data?.product_template_id}`}>
                    <Typography
                      fontFamily={"sans-serif"}
                      fontWeight={"bold"}
                      color={"#004f71"}
                      maxWidth={500}
                      fontSize={14}
                      noWrap={true}
                    >
                      {data?.name}
                    </Typography>
                  </Link>
                  <Typography fontSize={14} fontWeight={400}>
                    Ordered Quantity: {data?.product_uom_qty}{" "}
                    {data?.product_uom?.name}
                  </Typography>
                  <Typography fontSize={14} fontWeight={400}>
                    Price: {currency} {data?.price_unit}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} flexDirection={"column"}>
        <Grid item textAlign={"right"} marginTop={"-2rem"}>
          <Button
            size="small"
            variant="text"
            endIcon={
              viewDetail ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )
            }
            style={{ marginBottom: "0.5rem" }}
            onClick={() => setViewDetail(!viewDetail)}
          >
            View more details
          </Button>
        </Grid>
        <Grid
          item
          container
          style={{
            display: viewDetail ? "flex" : "none",
            boxShadow: "rgb(212, 212, 212) 0px 0px 5px inset",
          }}
          borderRadius={2}
          padding={2}
          paddingTop={1}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <Grid container item flexGrow={1} paddingRight={2}>
            <Typography
              fontWeight={500}
              fontSize={16}
              marginTop={1}
              marginBottom={1}
            >
              Delivery Details
            </Typography>
            <Grid container paddingLeft={1} flexDirection={"column"}>
              <Typography marginTop={1} fontWeight={400} fontSize={14}>
                Total Quantity:{" "}
                <strong>
                  {data.product_uom_qty} {data?.product_uom?.name}
                </strong>
              </Typography>
              <Typography marginTop={1} fontWeight={400}>
                Product Delivered:{" "}
                <strong>
                  {data.qty_delivered} {data.product_uom?.name}
                </strong>
              </Typography>
              {data.qty_to_deliver ? (
                <Typography marginTop={1} fontWeight={400}>
                  Product to Deliver:
                  <strong>
                    {data.qty_to_deliver} {data.product_uom?.name}
                  </strong>
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export { OrderProductItem };
