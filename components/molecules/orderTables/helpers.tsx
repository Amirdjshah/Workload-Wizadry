import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Download from "@mui/icons-material/Download";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import Router from "next/router";
import { StatusPill } from "../../elements/satusPill";
// import { downloadInvoice } from "../../../lib";
import { saveBase64AsPDF } from "../../utils";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";

export const COLOR_MAP: any = {
  "to invoice": "secondary",
  invoiced: "primary",
  no: "warning",
};

const LABEL_MAP: any = {
  invoiced: "Fully Invoiced",
  "to invoice": "Invoiced",
  no: "Pending",
};

const STATE_COLOR_MAP: any = {
  done: "info",
  sale: "primary",
  cancel: "error",
};
const STATE_LABEL_MAP: any = {
  sale: "Completed",
  done: "Done",
  cancel: "Cancelled",
};

export const columns: GridColDef[] = [
  { field: "display_name", headerName: "Order Number", width: 200, flex: 1 },
  {
    field: "create_date",
    headerName: "Created At",
    width: 150,
    flex: 1,
    renderCell: ({ value }) => {
      return <div>{moment(value).format("DD MMMM YYYY")}</div>;
    },
  },
  {
    field: "date_order",
    headerName: "Order at",
    width: 150,
    flex: 1,
    renderCell: ({ value }) => {
      return <div>{moment(value).format("DD MMMM YYYY")}</div>;
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
    headerName: "No. of Items",
    width: 200,
    flex: 1,
    renderCell: ({ value }) => {
      if (value.length > 0) {
        return <div>{value.length || 0} item's</div>;
      }
      return <div>-</div>;
    },
  },
  {
    field: "state",
    headerName: "Order Status",
    width: 200,
    flex: 1,
    renderCell: (data) => (
      <StatusPill
        options={{
          color: STATE_COLOR_MAP[data.value],
          label: STATE_LABEL_MAP[data.value],
        }}
      />
    ),
  },
  {
    field: "invoice_status",
    headerName: "Invoice Status",
    width: 200,
    flex: 1,
    renderCell: (params) => {
      const state = params?.row?.state;
      if (state === "cancel") {
        return (
          <StatusPill
            options={{
              color: "error",
              label: "Cancelled",
            }}
          />
        );
      }
      return (
        <StatusPill
          options={{
            color: COLOR_MAP[params?.value],
            label: LABEL_MAP[params?.value],
          }}
        />
      );
    },
  },
  {
    field: "action",
    headerName: "Actions",
    width: 150,
    renderCell: ({ row }) => {
      const [loading, setLoading] = useState(false);
      const handleClick = () => {
        setLoading(true);
        // downloadInvoice(row.id)
        //   .then((res) =>
        //     saveBase64AsPDF(res?.data?.data, `invoice_${row.id}.pdf`)
        //   )
        //   .catch((e) => {
        //     enqueueSnackbar({
        //       variant: "error",
        //       message: "Error while download invoice!",
        //       className: "error-snackbar",
        //     });
        //   })
        //   .finally(() => setLoading(false));
      };

      return (
        <>
          <Button
            startIcon={<VisibilityIcon />}
            variant="text"
            onClick={() => {
              Router.push(`/orders/detail/${row.id}`);
            }}
          >
            View Order
          </Button>
        </>
      );
    },
  },
];
