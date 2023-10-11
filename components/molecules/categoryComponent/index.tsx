import React, { useEffect, useState } from "react";
import { SectionTitle } from "../../atom/sectionTitle";
import { CardGroup } from "../../elements";
import { CategoryCard, TitleFilter } from "../../atom";
import { fetchCategories } from "../../../lib/product";
import { useQueries, useQuery } from "@tanstack/react-query";

interface ICategoryProps {
  showFilter?: boolean;
}
const CategorySection: React.FC<ICategoryProps> = ({ showFilter }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["Fetch Categories"],
    queryFn: fetchCategories,
    select: ({ data }) => data,
  });

  return (
    <div>
      {showFilter && <TitleFilter count={100} setCount={() => {}} />}
      <SectionTitle title={"Explore by category"} />
      <CardGroup isLoading={isLoading}>
        {data?.results?.map((item: any, index: number) => (
          <CategoryCard name={item.name} id={item.id} key={index} />
        ))}
      </CardGroup>
    </div>
  );
};
export { CategorySection };
