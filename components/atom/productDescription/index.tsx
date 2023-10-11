import { Divider, Typography } from "@mui/material";
import React from "react";
import styles from "./style.module.scss";
import { AttributeLine } from "../../../interfaces/dataInterface";
import { Paragraph } from "../paragraph";

interface IProps {
  attribute?: AttributeLine[];
  description?: string | null;
}

const ProductDescription: React.FC<IProps> = ({ attribute, description }) => {
  return (
    <div className={styles.productDescription}>
      <Typography
        variant="h6"
        fontSize={17}
        fontWeight={500}
        marginBottom={1.5}
      >
        Description
      </Typography>
      <Paragraph text={description || "No Description Available"} />
      <hr />
      {attribute && attribute?.length > 0 && (
        <>
          <Typography variant="h6" fontSize={17} fontWeight={500} marginTop={2}>
            Attribute
          </Typography>
          <div className={styles.content}>
            {(attribute || []).map((item, i): any => {
              return (
                <div
                  key={i}
                  style={{ display: "flex" }}
                  className={styles.attributeItem}
                >
                  <div className={styles.label} style={{ fontWeight: "bold" }}>
                    {item.display_name}:
                  </div>
                  {`${item.value_ids
                    .reduce((a: string[], i) => {
                      a.push(i.name);
                      return a;
                    }, [])
                    .join(", ")}`}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export { ProductDescription };
