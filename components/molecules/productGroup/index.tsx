import React from "react";
import { SectionTitle } from "../../atom/sectionTitle";
import { ProductGroup } from "../../elements/productGroup";

interface IProps {
  count?: number;
  title?: string;
}
const AllProductSection: React.FC<IProps> = ({ count, title }) => {
  return (
    <div className="all-product-homepage">
      <SectionTitle
        marginTop={6}
        title={title || "Products"}
        linkText="View all products"
        link="/product"
      />
      <ProductGroup showFilter={false} count={count} />
    </div>
  );
};
export { AllProductSection };
