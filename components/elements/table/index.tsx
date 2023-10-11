import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

interface ITable {
  data: any;
  columns: GridColDef[];
  rowHeight?: number;
  loading?: boolean;
  sx?: SxProps<Theme>;
  headerHeight?: number;
}
const CONFIG = {
  pagination: {
    paginationModel: {
      pageSize: 10,
    },
  },
};
export const Table: React.FC<ITable> = ({
  data,
  columns,
  sx,
  rowHeight,
  headerHeight,
  loading,
}) => {
  return (
    <DataGrid
      rows={data}
      initialState={CONFIG}
      rowSelection={false}
      rowHeight={rowHeight}
      columnHeaderHeight={headerHeight || 55}
      loading={loading}
      sx={sx}
      columns={columns}
      pageSizeOptions={[10, 25, 50]}
      slots={{
        noRowsOverlay: () => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              alignItems: "center",
            }}
          >
            <p>No data found !!!</p>
          </div>
        ),
      }}
    />
  );
};
