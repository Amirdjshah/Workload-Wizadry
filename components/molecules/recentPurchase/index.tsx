import React from "react";
import { SectionTitle } from "../../atom/sectionTitle";
import styles from "./style.module.scss";
import { IFavoriteItem } from "../../../interfaces/dataInterface";
import { FavoriteGroup } from "../../elements/favoriteGroup";

interface IProps {
  categoryName: string;
  productList: IFavoriteItem[];
}
const FavProducts: React.FC<IProps> = ({ categoryName, productList }) => {
  return (
    <div className={styles.favoriteSection}>
      <SectionTitle
        title={categoryName}
        fontSize={18}
        linkText="Explore Category"
        link={`/product?cat=${categoryName}`}
      />
      <FavoriteGroup productList={productList} />
    </div>
  );
};
export { FavProducts };
