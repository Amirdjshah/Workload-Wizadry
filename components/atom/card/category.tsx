import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from "./style.module.scss";
import { useRouter } from "next/router";

interface IProps {
  name: string;
  id: string;
}
const CategoryCard: React.FC<IProps> = ({ name, id }) => {
  const router = useRouter();
  return (
    <Grid
      xs={6}
      sm={4}
      md={3}
      lg={2}
      xl={2}
      spacing={4}
      paddingRight={3}
      paddingBottom={2}
      key={id}
      onClick={() => router.push(`/product?cat=${name}`)}
      //   style={{height: "contain"}}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <div
        className={styles.categoryCard}
        style={{ border: "1px solid lightgray" }}
      >
        <div className={styles.imageSection}>
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/web/image/product.category/${id}/image/`}
            alt={name}
          />
        </div>
        <Typography
          textAlign={"center"}
          paddingLeft={2}
          paddingRight={2}
          style={{ fontFamily: "roboto, sans-serif" }}
          fontSize={15}
        >
          {name}
        </Typography>
      </div>
    </Grid>
  );
};
export { CategoryCard };
