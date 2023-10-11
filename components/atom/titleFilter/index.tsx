import { FormControl, Grid, SelectChangeEvent } from "@mui/material";
import React from "react";
import { Stats } from "react-instantsearch-dom";

const SelectAutoWidth: React.FC = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 2, minWidth: 100 }}>
        {/* <SortBy
          items={[
            { value: "_search", label: "Featured" },
            { value: "instant_search_price_asc", label: "Price asc." },
            { value: "instant_search_price_desc", label: "Price desc." },
          ]}
          defaultRefinement="instant_search"
        /> */}
      </FormControl>
    </div>
  );
};
interface IProps {
  setCount: (v: number) => void;
  count?: number
}
const TitleFilter: React.FC<IProps> = ({ setCount, count }) => {
  return (
    <Grid
      container
      justifyContent={"space-between"}
      flexWrap={"nowrap"}
      alignItems={"center"}
    >
      {/* <Grid item>
        <Stats
          translations={{
            stats(nbHits, processingTimeMS, nbSortedHits, areHitsSorted) {
              setCount(nbHits);
              return areHitsSorted && nbHits !== nbSortedHits
                ? `${nbSortedHits!.toLocaleString()} relevant results sorted out of ${nbHits.toLocaleString()} found in ${processingTimeMS.toLocaleString()}ms`
                : nbHits > 0
                ? `${nbHits.toLocaleString()} result's found`
                : `No product`;
            },
          }}
        />
      </Grid> */}
      <Grid item>
        <SelectAutoWidth />
      </Grid>
    </Grid>
  );
};
export { TitleFilter };
