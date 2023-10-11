import React from "react";
import { Table } from "../../elements";
import { columns } from "./helpers";

interface Props {
  data: any;
  loading?: boolean;
}
const AllQuotation: React.FC<Props> = ({ data, loading }) => {
  return <Table data={data || []} columns={columns} loading={loading} />;
};

export { AllQuotation };
