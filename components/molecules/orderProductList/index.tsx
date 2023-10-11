import { Divider, Grid, Paper } from "@mui/material";
import React from "react";
import { OrderProductItem } from "../../elements";
import { IOrderLine } from "../../../interfaces/dataInterface";

interface IProps {
  status: "Dispatched" | "Completed" | "Processing";
  createdAt: string;
  isLoading: boolean;
  data: IOrderLine[];
}

const OrderProductList: React.FC<IProps> = ({
  status = "Completed",
  data,
  createdAt,
}) => {
  return (
    <Paper
      elevation={0}
      style={{
        width: "100%",
        borderRadius: "0.5rem",
        background: "none",
      }}
    >
      <Grid container minHeight={"10rem"}>
        {data.map((productData, key) => (
          <Grid item sm={12} paddingLeft={2} key={key} marginBottom={4}>
            <OrderProductItem
              data={productData}
              created_at={createdAt}
              status={status}
            />
            <Divider style={{ marginTop: "1rem" }} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
export { OrderProductList };
