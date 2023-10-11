import React from "react";
import { SectionTitle } from "../../atom/sectionTitle";
import { ProductGroup } from "../../elements/productGroup";
import styles from "./style.module.scss";

const RecentPurchaseSection: React.FC = () => {
  return (
    <div className={styles.recentPurchaseSection}>
      <SectionTitle
        title={"Recent Purchase"}
        linkText="View Order History"
        link="/category/1"
      />
      <ProductGroup />
    </div>
  );
};
export { RecentPurchaseSection };
