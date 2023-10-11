import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Grid } from "@mui/material";

interface IProps {
  height?: any;
  onClick?: () => any;
}
const Logo: React.FC<IProps> = ({ height, onClick }) => {
  return (
    <Grid container flexDirection={"row"} justifyContent={"center"} gap={2}>
      <Grid item>
        <img
          src="/logo.jpg"
          alt="logo"
          height={height || "200"}
          className={"pointer"}
        //   onClick={onClick}
        />
      </Grid>
      <Grid item>
        <img
          src="/logo2.jpg"
          alt="logo"
          width="200"
          height="200"
          className={"pointer"}
        //   onClick={onClick}
        />
      </Grid>
    </Grid>
  );
};

const MenuLogo: React.FC<any> = ({ onClick }) => {
  return (
    <Grid container flexDirection={"row"} justifyContent={"center"} gap={2}>
      <Grid item>
        <img
          src="/menuimage.jpeg"
          alt="logo"
          width={"100%"}
          className={"pointer"}
          onClick={onClick}
        />
      </Grid>
    </Grid>
  );
};

export { Logo, MenuLogo };
