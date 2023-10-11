import React, { useContext, useState } from "react";
import { Table } from "../table";
import { GridColDef } from "@mui/x-data-grid";
import { IOrderLine } from "../../../interfaces/dataInterface";
import { Grid, Typography } from "@mui/material";
import { AuthContext } from "../../context/authContext";
import { ProductQuoteItem } from "../../atom/productQuoteItem";
import { ProductQuantity } from "../../atom/productQuantity";

export const columns = (
  cur: string,
  is_checked?: boolean
): GridColDef<any, IOrderLine, any>[] => [
  {
    field: "product_id",
    headerName: "Product Name",
    width: 200,
    valueFormatter: (value) => value.value?.name || "-",
    flex: 1,
    renderCell: (params) => {
      return <ProductQuoteItem data={params.row} />;
    },
  },
  {
    field: "product_uom",
    headerName: "Unit",
    width: 100,
    renderCell: (params) => {
      return <p>{params?.row?.product_uom?.name}</p>;
    },
  },
  {
    field: "product_uom_qty",
    headerName: "Quantity",
    width: 150,
    renderCell: (params) => <ProductQuantity data={params.row} />,
  },
  {
    field: "discounted",
    headerName: "Discount",
    width: 100,
    renderCell: (params) => {
      if (is_checked) {
        return <Typography>{params?.row?.discount} %</Typography>;
      }
      return <Typography>-</Typography>;
    },
  },
  {
    field: "taxes",
    headerName: "Tax",
    width: 100,
    renderCell: (params) => {
      if (is_checked) {
        return (
          <Typography>
            {params?.row?.price_tax} {cur}
          </Typography>
        );
      }
      return <Typography>-</Typography>;
    },
  },
  {
    field: "price_unit",
    headerName: `Unit Price`,
    width: 100,
    valueFormatter: (value) => (value?.value ? `${value.value} ${cur}` : "-"),
    renderCell: (params: any) => {
      if (is_checked) {
        return <Typography>{params?.formattedValue}</Typography>;
      }
      return <Typography>-</Typography>;
    },
  },
  {
    field: "price_total",
    headerName: `Total`,
    width: 100,
    valueFormatter: (value) => (value?.value ? `${value.value} ${cur}` : "-"),
    renderCell: (params: any) => {
      if (is_checked) {
        return <Typography>{params?.formattedValue}</Typography>;
      }
      return <Typography>-</Typography>;
    },
  },
];

interface IProps {
  data: IOrderLine[];
  loading?: boolean;
  is_checked?: boolean;
}

const QuotationTable: React.FC<IProps> = ({ data, loading, is_checked }) => {
  const { currency } = useContext(AuthContext);
  return (
    <Grid container marginBottom={2} width={"100%"}>
      <Grid item xs={12}>
        <Table
          data={data || []}
          rowHeight={150}
          headerHeight={0}
          columns={columns(currency, is_checked)}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};

export { QuotationTable };
