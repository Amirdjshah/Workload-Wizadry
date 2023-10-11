import { Divider, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { ICategoryFilter } from "../../../interfaces/dataInterface";

interface ICategoryFilterProps {
  data: ICategoryFilter[];
}
const CategoryFilter: React.FC<ICategoryFilterProps> = ({ data }) => {
  return (
    <Stack>
      <Typography variant="h6">CATEGORIES</Typography>
      {data.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          style={{ textDecoration: "none", marginTop: "0.5rem" }}
        >
          <Typography variant="body1">{item.label}</Typography>
        </Link>
      ))}
      <Divider style={{ marginBlock: "1rem" }} />
    </Stack>
  );
};
export { CategoryFilter };
