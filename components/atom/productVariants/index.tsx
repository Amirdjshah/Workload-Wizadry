import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const ProductVariants: React.FC = () => {
  return (
    <Grid marginTop={6} container direction="column">
      <Typography>Select a variant</Typography>
      <Stack spacing={2} direction="row">
        <Image src="/product-placeholder.jpg" alt="#" width={65} height={65} />
        <Image src="/product-placeholder.jpg" alt="#" width={65} height={65} />
        <Image src="/product-placeholder.jpg" alt="#" width={65} height={65} />
      </Stack>
    </Grid>
  );
};
export { ProductVariants };
