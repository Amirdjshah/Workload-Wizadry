import React from "react";
import { ProductCard } from "../../atom";
import { Grid } from "@mui/material";
import { IFavoriteItem } from "../../../interfaces/dataInterface";

interface IFavProductGroupProps {
  productList: IFavoriteItem[];
}

const FavoriteGroup: React.FC<IFavProductGroupProps> = ({ productList }) => {
  return (
    <Grid container rowGap={5} gap={5}>
      {productList.map((item) => (
        <Grid item xs={2.4} key={item.id}>
          <ProductCard
            hit={{
              name: item?.product_id?.name || "",
              id: item.product_id.id,
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export { FavoriteGroup };
