import { GridColDef } from "@mui/x-data-grid";
import { StatusPill } from "../../elements/satusPill";
import { Button } from "../../atom";
import EyeIcon from "@mui/icons-material/RemoveRedEye";
import { Tooltip, tooltipClasses } from "@mui/material";

const COLOR_MAP: any = {
  "In Progress": "warning",
  Done: "success",
  Cancel: "error",
};

export const columns = (cb: any): GridColDef[] => [
  { field: "request_by", headerName: "Request By", width: 200, flex: 1 },
  { field: "request_on", headerName: "Request On", width: 200, flex: 1 },
  {
    field: "need_by",
    headerName: "Need By",
    width: 200,
    flex: 1,
    valueFormatter: (value: any) => value?.value || "-",
  },
  {
    field: "often_order",
    headerName: "Order Frequency",
    width: 200,
    flex: 1,
    valueFormatter: (v) => {
      return v?.value || "-";
    },
  },
  {
    field: "total_item",
    headerName: "Total Products",
    width: 200,
    flex: 1,
    renderCell: (data) => {
      return <> {data.value > 0 ? <p>{data.value} item(s)</p> : "-"}</>;
    },
  },
  {
    field: "comment",
    headerName: "Comment",
    width: 200,
    flex: 1,
    renderCell: (data) => {
      return (
        <div>
          {" "}
          {data.value ? (
            <Tooltip
              slotProps={{
                tooltip: {
                  sx: {
                    [`&.${tooltipClasses.tooltip}`]: {
                      backgroundColor: "white",
                      color: "gray",
                      padding: "20px",
                      fontSize: "14px",
                      textAlign: "justify",
                    },
                  },
                },
              }}
              title={data?.value}
              arrow
            >
              <Button variant="text" color="primary">
                View Comment
              </Button>
            </Tooltip>
          ) : (
            "-"
          )}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    flex: 1,
    renderCell: (data) => (
      <StatusPill
        options={{ color: COLOR_MAP[data.value], label: data.value }}
      />
    ),
  },
  {
    field: "action",
    headerName: "",
    flex: 1,
    width: 300,
    renderCell: ({ row }) => (
      <Button
        startIcon={<EyeIcon />}
        variant="text"
        onClick={() => {
          cb(row);
        }}
      />
    ),
  },
];
