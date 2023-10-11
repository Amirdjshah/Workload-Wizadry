import { GridColDef } from "@mui/x-data-grid";
import { Button } from "../../atom";
import { StatusPill } from "../../elements/satusPill";
import EditIcon from "@mui/icons-material/Edit";
import Router from "next/router";

const COLOR_MAP: any = {
  active: "primary",
  disabled: "primary",
};
export const columns: GridColDef[] = [
  //   { field: "id", headerName: "ID", width: 20 },
  { field: "name", headerName: "Name", width: 200, flex: 1 },
  { field: "email", headerName: "Email", width: 300, flex: 1 },
  { field: "phone", headerName: "Phone", width: 200, flex: 1 },
  {
    field: "role",
    headerName: "Role",
    width: 200,
    flex: 1,
    valueFormatter: (value) => value?.value || "-",
  },
  { field: "create_date", headerName: "Created at", width: 150 },
  {
    field: "status",
    headerName: "State",
    width: 100,
    renderCell: (data) => (
      <StatusPill
        options={{
          label: data.value,
          color: COLOR_MAP[data.value],
        }}
      />
    ),
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    width: 300,
    renderCell: ({ row }: any) => {
      return (
        <Button
          startIcon={<EditIcon />}
          variant="text"
          onClick={() => Router.push(`/users/${row.id}`)}
        />
      );
    },
  },
];
