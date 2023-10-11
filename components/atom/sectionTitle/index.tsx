import { PRIMARY_COLOR } from "@config/cssVariables";
import { Grid, Skeleton, Box } from "@mui/material";
import Link from "next/link";
import React from "react";

interface ISectionTitleProps {
  title: string;
  link?: string;
  linkText?: string;
  marginTop?: number;
  leftChildren?: React.ReactElement;
  fontSize?: number;
  marginBottom?: number;
  children?: React.ReactElement;
  loading?: boolean;
}
const SectionTitle: React.FC<ISectionTitleProps> = ({
  title,
  link,
  linkText,
  marginTop,
  leftChildren,
  fontSize,
  marginBottom,
  children,
  loading,
}) => {
  return (
    <Grid
      container
      justifyContent={"space-between"}
      marginBottom={marginBottom !== undefined ? marginBottom : 2}
      wrap="nowrap"
      marginTop={marginTop}
    >
      {!loading && (
        <Grid
          item
          fontFamily={"sans-serif"}
          fontWeight={"bold"}
          alignItems={"center"}
          fontSize={fontSize || 17}
          container
          wrap="nowrap"
        >
          {title}
          {leftChildren}
        </Grid>
      )}
      {loading && (
        <Grid
          item
          fontFamily={"sans-serif"}
          fontWeight={"bold"}
          alignItems={"center"}
          fontSize={fontSize || 17}
          container
          wrap="nowrap"
        >
          <Skeleton
            height={"3rem"}
            width={"10rem"}
            style={{ marginRight: "1rem" }}
          />
          <Skeleton
            height={"3rem"}
            width={"10rem"}
            style={{ marginRight: "1rem" }}
          />
        </Grid>
      )}
      <Grid
        item
        fontFamily={"sans-serif"}
        width="fit-content"
        minWidth={"fit-content"}
      >
        {link && (
          <Link
            href={link}
            style={{ color: PRIMARY_COLOR, width: "fit-content" }}
          >
            {linkText}{" "}
          </Link>
        )}
        {!loading ? children : <Skeleton height={"3rem"} width={"10rem"} />}
      </Grid>
    </Grid>
  );
};

export { SectionTitle };
