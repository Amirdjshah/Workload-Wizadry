import { Grid, Typography } from "@mui/material";
import React from "react";

interface IProps {
  data: any;
  index: number;
}

const NewItemPartItem: React.FC<IProps> = ({ data, index }) => {
  return (
    <Grid container marginBottom={2} alignItems={"center"}>
      <Grid item width={50}>
        {index}
      </Grid>
      <Grid item xs={3}>
        <Typography fontFamily={"sans-serif"} fontSize={14} noWrap={true}>
          {data?.product_name}
        </Typography>
      </Grid>
      <Grid item xs={3.5}>
        <Typography fontFamily={"sans-serif"} fontSize={14} noWrap={true}>
          {data?.description}
        </Typography>
      </Grid>
      <Grid item marginX={1} width={100}>
        <Typography fontFamily={"sans-serif"} fontSize={14} noWrap={true}>
          {data?.item_pn}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography fontFamily={"sans-serif"} fontSize={14} noWrap={true}>
          {data?.manufacturer}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography fontFamily={"sans-serif"} fontSize={14} noWrap={true}>
          {data?.quantity} {data?.uom}
        </Typography>
      </Grid>
    </Grid>
  );
};
export { NewItemPartItem };
