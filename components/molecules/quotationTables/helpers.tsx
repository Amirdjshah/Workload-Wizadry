import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { Button } from "../../atom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Router from "next/router";
import { StatusPill } from "../../elements/satusPill";

const COLOR_MAP: any = {
  draft: "warning",
  sent: "info",
  cancel: "error",
};
const LABEL_MAP: any = {
  draft: "Pending",
  sent: "Received",
  cancel: "Cancelled",
};

export const columns: GridColDef[] = [
  { field: "display_name", headerName: "Quote Number", width: 200, flex: 1 },
  {
    field: "create_date",
    headerName: "Requested Date",
    width: 150,
    flex: 1,
    renderCell: ({ value }) => {
      return <div>{moment(value).format("DD MMMM YYYY HH:mm")}</div>;
    },
  },
  {
    field: "partner_id",
    headerName: `Requested By`,
    width: 200,
    flex: 1,
    renderCell: ({ value }) => {
      return <div>{value?.name}</div>;
    },
  },
  {
    field: "order_line",
    headerName: "No. of Item's",
    width: 100,
    flex: 1,
    renderCell: ({ value }) => {
      return (
        <div>{value.length ? `${value.length} item's` : "Empty Quotation"} </div>
      );
    },
  },
  {
    field: "state",
    headerName: "Status",
    width: 100,
    flex: 1,
    renderCell: (data) => (
      <StatusPill
        options={{ color: COLOR_MAP[data.value], label: LABEL_MAP[data.value] }}
      />
    ),
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: ({ row }) => {
      return (
        <Button
          endIcon={<VisibilityIcon />}
          variant="text"
          title="View Quote Details"
          onClick={() => {
            Router.push(`/quotes/${row.id}`);
          }}
        >
          View Details
        </Button>
      );
    },
  },
];
