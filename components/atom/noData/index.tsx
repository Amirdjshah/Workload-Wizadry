import React from "react";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";

interface Props {
  message?: string;
}
const NoData: React.FC<Props> = ({ message }) => {
  return (
    <Grid
      container
      flexDirection={"column"}
      color={"gray"}
      justifyContent={"center"}
    >
      <Image
        src={"/empty-box.png"}
        width={150}
        height={150}
        alt={"No-data"}
        style={{ margin: "auto", marginBlock: 0 }}
      />
      <Typography marginTop="1rem" textAlign={"center"}>
        {message ?? "No Products Found!"}
      </Typography>
    </Grid>
  );
};
export { NoData };
