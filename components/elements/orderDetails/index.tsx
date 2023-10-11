import React from "react";
import { Grid, Typography } from "@mui/material";
import {
  Phone,
  LocationCityRounded,
  AccountCircle,
  LocalShippingOutlined,
} from "@mui/icons-material";
import { IOrder } from "../../../interfaces/dataInterface";

const TypographySetting = {
  fontWeight: 400,
  paddingLeft: 1,
};
interface IOrderDetails {
  data?: IOrder;
}

const OrderDetails: React.FC<IOrderDetails> = ({ data }) => {
  const deliveryAddress = data?.partner_shipping_id;
  const invoiceAddress = data?.partner_invoice_id;
  return (
    <Grid container direction={"row"} justifyContent={"space-between"}>
      <Grid
        container
        flexGrow={1}
        style={{
          backgroundColor: "#b8dde1",
          padding: "0.5rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <Grid item container gap={2} alignItems={"center"}>
          <LocalShippingOutlined style={{color:"#004f71"}} />
          <Typography color={"#004f71"} fontSize={16} width="fit-content" fontWeight={500}>
            Shipment Address
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        marginBottom={4}
        marginTop={1}
        xs={5.8}
        flexGrow={1}
        paddingLeft={2}
      >
        <Typography
          fontSize={16}
          marginBottom={2}
          fontWeight={500}
          width={"100%"}
        >
          Delivery Address
        </Typography>
        <Grid container paddingLeft={1} flexDirection={"column"}>
          <Grid container>
            <AccountCircle />
            <Typography {...TypographySetting}>
              {deliveryAddress?.name || "-"}
            </Typography>
          </Grid>
          <Grid container marginTop={1} wrap="nowrap">
            <LocationCityRounded />
            <Typography
              {...TypographySetting}
              marginBottom={1}
              style={{ wordBreak: "break-word" }}
            >
              {`${
                deliveryAddress?.country_id?.name
                  ? deliveryAddress?.country_id?.name
                  : ""
              }${
                deliveryAddress?.state_id?.name
                  ? ", " + deliveryAddress?.state_id?.name
                  : ""
              } ${
                deliveryAddress?.state_id?.name
                  ? ", " + deliveryAddress?.state_id?.name
                  : ""
              }${
                deliveryAddress?.street2 ? ", " + deliveryAddress?.street2 : ""
              }
              `}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* Invoice section */}
      <Grid container marginBottom={4} marginTop={1} xs={6}>
        <Typography
          fontSize={16}
          marginBottom={2}
          fontWeight={500}
          width={"100%"}
        >
          Invoice Information
        </Typography>
        <Grid container paddingLeft={1} flexDirection={"column"}>
          <Grid container>
            <AccountCircle />
            <Typography {...TypographySetting}>
              {data?.partner_invoice_id?.name || "-"}
            </Typography>
          </Grid>
          <Grid container marginTop={1} wrap="nowrap">
            <LocationCityRounded />
            <Typography {...TypographySetting} marginBottom={1}>
              {`${
                invoiceAddress?.country_id?.name
                  ? invoiceAddress?.country_id?.name
                  : ""
              }${
                invoiceAddress?.state_id?.name
                  ? ", " + invoiceAddress?.state_id?.name
                  : ""
              } ${
                invoiceAddress?.street
                  ? ", " + invoiceAddress?.state_id?.name
                  : ""
              }${invoiceAddress?.street2 ? ", " + invoiceAddress?.street2 : ""}
              `}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { OrderDetails };
