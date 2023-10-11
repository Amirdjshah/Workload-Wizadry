import { Avatar, Grid } from "@mui/material";
import React from "react";
import styles from "./style.module.scss";

interface IProps {
  name: string;
  company: string;
  src?: string;
}

const NameCard: React.FC<IProps> = ({ name, company, src }) => {
  return (
    <div className={styles.nameCard}>
      <Grid container wrap={"nowrap"}>
        <Grid item sm={"auto"}>
          <Avatar src={src}>{name?.slice(0, 1)}</Avatar>
        </Grid>
        <Grid item sm={7} marginLeft={1}>
          <h2>{name}</h2>
          <span>{company}</span>
        </Grid>
      </Grid>
    </div>
  );
};
export { NameCard };
