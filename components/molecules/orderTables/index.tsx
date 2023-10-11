import React from "react";
import { Table } from "../../elements";
import { IOrder } from "../../../interfaces/dataInterface";
import { columns } from "./helpers";

interface IProps {
  data: IOrder[];
  isLoading: boolean;
}

const OrderTable: React.FC<IProps> = ({ data, isLoading }) => {
  return (
    <Table
      data={data || []}
      columns={columns}
      rowHeight={70}
      loading={isLoading}
    />
  );
};

export { OrderTable };
