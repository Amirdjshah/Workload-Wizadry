import React from "react";
import { BenefitFilter, CategoryFilter, ProductFilter } from "../../atom";
import styles from "./style.module.scss";
import { Panel, RefinementList } from "react-instantsearch-dom";
import { useRouter } from "next/router";
import { Divider, Typography } from "@mui/material";
import { PRIMARY_COLOR } from "@config/cssVariables";

const Filter: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.section}>
      {/* <Typography
        marginTop={2}
        marginBottom={1}
        color={PRIMARY_COLOR}
        style={{ fontSize: "20px" }}
      >
        Filter
      </Typography>
      <Divider /> */}
      {/* <div className={styles.categoryComponent}>
        <Panel header="Categories">
          <Divider />
          <RefinementList
            attribute="categories"
            defaultRefinement={
              router.query.cat ? [router.query.cat] : undefined
            }
            searchable={true}
          />
        </Panel>
      </div>
      <div className={styles.categoryComponent}>
        <Panel header="Material">
          <Divider />
          <RefinementList attribute="attributes.Material" />
        </Panel>
      </div>
      <div className={styles.categoryComponent}>
        <Panel header="Color">
          <Divider />
          <RefinementList attribute="attributes.color" />
        </Panel>
      </div> */}
    </div>
  );
};

export { Filter };
