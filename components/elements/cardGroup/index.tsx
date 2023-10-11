import React from "react";
import { Grid, Skeleton } from "@mui/material";
import { GetServerSideProps } from "next";

interface IProps {
  children: React.ReactElement;
  isLoading?: boolean;
}
const WIDTH = 180;
const HEIGHT = 180;
const xs = 1;
const CardGroup: React.FC<IProps> = ({ children, isLoading }) => {
  if (isLoading)
    return (
      <Grid container gap={5} columnGap={7}>
        {new Array(12).fill(null).map(() => (
          <Grid item xs={6} sm={4} md={2} lg={1.5} xl={2}>
            <Skeleton variant="rectangular" width={WIDTH} height={HEIGHT} />
          </Grid>
        ))}
      </Grid>
    );
  return (
    <Grid container style={{ position: "relative" }} rowGap={1}>
      {children}
    </Grid>
  );
};
export { CardGroup };

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("/api/categories");
  const repo = await res.json();
  return { props: { repo } };
};
