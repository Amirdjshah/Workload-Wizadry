import React, { useContext } from "react";
import { Table } from "../../elements";
import { columns } from "./helpers";
import { AuthContext } from "../../context/authContext";

interface ComponentProps {
  data: Array<any>;
  loading: boolean;
}

const UsersTable: React.FC<ComponentProps> = ({ data, loading }) => {
  const { role } = useContext(AuthContext);
  return (
    <Table
      data={data}
      loading={loading}
      columns={
        role === "admin"
          ? columns
          : columns.filter((item) => item.field !== "action")
      }
    />
  );
};

export { UsersTable };
