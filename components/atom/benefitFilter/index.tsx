import { Divider, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { ICategoryFilter } from "../../../interfaces/dataInterface";
import { Checkbox } from "../checkbox";

interface IProductProps {
  data: ICategoryFilter[];
}
const BenefitFilter: React.FC<IProductProps> = ({ data }) => {
  return (
    <Stack>
      <Typography variant="h6">BENEFITS FILTER</Typography>
      {data.map((item, index) => (
        <Link key={index} href={item.href} style={{ textDecoration: "none" }}>
          <Checkbox label={item.label} />
        </Link>
      ))}
    </Stack>
  );
};
export { BenefitFilter };
