import { Breadcrumbs, Typography } from "@mui/material";
import { IBreadCrumb } from "@interfaces";
import Link from "next/link";
import { PRIMARY_COLOR } from "@config/cssVariables";

interface IBreadCrumbProps {
  data: IBreadCrumb[];
  size?: number;
}
const BreadCrumb: React.FC<IBreadCrumbProps> = ({ data, size }) => {
  return (
    <Breadcrumbs>
      {data.map((item) => {
        return item.href ? (
          <Link href={item.href}>
            <Typography fontSize={size} color={PRIMARY_COLOR}>{item.label}</Typography>
          </Link>
        ) : (
          <Typography fontSize={size}>{item.label}</Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export { BreadCrumb };
