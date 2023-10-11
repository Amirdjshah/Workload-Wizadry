import React, { useState } from "react";
import { NoData, ProductCard, TitleFilter } from "../../atom";
import { CircularProgress, Divider, Grid } from "@mui/material";
import {
  Configure,
  Hits,
  Pagination,
  connectStateResults,
} from "react-instantsearch-dom";
import { AttributeToRetrieve } from "@config/algolia";
import "instantsearch.css/themes/satellite.css";
import { isServer } from "@tanstack/react-query";

type Card = "Recent" | undefined;
interface IProductGroupProps {
  showFilter?: boolean;
  type?: Card;
  count?: number;
  isSearching?: boolean;
}

const ProductGroup: React.FC<IProductGroupProps> = ({
  showFilter,
  isSearching,
  type,
  count,
}) => {
  const [pCount, setPCount] = useState<number>(0);
  return (
    <div style={{ flexGrow: 1 }}>
      {showFilter && (
        <>
          <TitleFilter setCount={setPCount} />
          <Divider style={{ marginBottom: "1.5rem" }} />
        </>
      )}
      {/* <Configure
        hitsPerPage={count || 12}
        attributesToRetrieve={AttributeToRetrieve.ProductCard}
      /> */}
      <Grid
        container
        className="product-card-group"
        style={{ position: "relative", maxWidth: "100%" }}
        rowGap={5}
      >
        {/* <Loading /> */}
        {isSearching !== undefined && isSearching && <CircularProgress />}
        {/* {pCount > 0 || !showFilter ? (
          <>
            <Hits hitComponent={ProductCard} />
            {showFilter && <Pagination />}
          </>
        ) : (
          <NoData />
        )} */}
      </Grid>
    </div>
  );
};
export { ProductGroup };
