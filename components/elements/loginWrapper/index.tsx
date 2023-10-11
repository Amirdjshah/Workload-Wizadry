import React from "react";
import { Grid, Typography } from "@mui/material";
import { Logo } from "../../atom";
import styles from "./wrapper.module.scss";
import { PRIMARY_COLOR } from "@config/cssVariables";

interface ILoginWrapper {
  children?: React.ReactElement;
}
const LoginWrapper: React.FC<ILoginWrapper> = ({ children }) => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={6}
        className={styles.cover}
        flexDirection={"column"}
        display={{ xs: "flex", sm: "none", md: "flex" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item>
        <Logo />
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        display={"flex"}
        height={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export { LoginWrapper };
