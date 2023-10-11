import React, { useState } from "react";
import { Table } from "../../elements";
import { columns } from "./helpers";
import { NewPartModal } from "../../elements/newPartModal";

interface ComponentProps {
  data: Array<any>;
  loading: boolean;
}

const AllInquiries: React.FC<ComponentProps> = ({ data, loading }) => {
  const [modal, showModal] = React.useState(false);
  const [modalData, setData] = useState([]);
  const handleClick = (data: any) => {
    setData(data);
    showModal(true);
  };
  return (
    <>
      <Table data={data} columns={columns(handleClick)} loading={loading} />
      <NewPartModal
        data={modalData}
        open={modal}
        onClose={() => showModal(false)}
      />
    </>
  );
};

export { AllInquiries };
