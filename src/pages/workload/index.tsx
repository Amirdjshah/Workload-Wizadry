"use client";

import { Button, Chip, Grid, IconButton, Tooltip } from "@mui/material";
import { CustomTab, DashboardLayout, Table } from "../../../components";
import { parseCookies } from "nookies";
import { SectionTitle } from "../../../components/atom/sectionTitle";
import { useModifyWorkload, useWorkload } from "../../../lib/hooks/workload";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Router from "next/router";
import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";

interface IProps {
  onDelete: () => void;
}

const COLOP_MAP: any = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "error",
  DRAFT: "info",
};

const columns: GridColDef[] = [
  {
    field: "serial_number",
    headerName: "S.N",
    width: 50,
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    width: 300,
    flex: 1,
    renderCell: (params) => {
      return (
        <Grid>
          <Chip label={params.value} color={COLOP_MAP[params.value]} />
          {params?.value === "REJECTED" && (
            <Tooltip title={`${params?.row?.reason}`}>
              <IconButton>
                <InfoIcon style={{ color: "red", marginLeft: "5px" }} />{" "}
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      );
    },
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 200,
    flex: 1,
    renderCell: (data) => {
      return moment(data.value).format("DD/MM/YYYY");
    },
  },
  {
    field: "updated_at",
    headerName: "Updated At",
    width: 200,
    flex: 1,
    renderCell: (data) => {
      return moment(data.value).format("DD/MM/YYYY");
    },
  },
];

export default function Workload() {
  const { workloadData, workloadLoading } = useWorkload();
  const { deleteWorkload } = useModifyWorkload();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let userRole = null;
  if (isClient) {
    userRole = localStorage.getItem("role_code");
  }

  const onDelete = (id: number) => {
    deleteWorkload.mutate(id);
  };

  let allColumns = columns;
  if (userRole === "CL") {
    const email = {
      field: "email",
      headerName: "Email",
      flex: 1,
      width: 300,
      renderCell: ({ row }: any) => {
        return <>{row?.user?.email}</>;
      },
    };
    const action = {
      field: "action",
      headerName: "Action",
      flex: 1,
      width: 300,
      renderCell: ({ row }: any) => {
        return (
          <Tooltip title="View Workload">
            <Button
              startIcon={<VisibilityIcon />}
              variant="text"
              onClick={() => Router.push(`/workload/view/${row.id}`)}
            >
              View
            </Button>
          </Tooltip>
        );
      },
    };
    allColumns = [...allColumns, email, action];
  } else {
    const action = {
      field: "action",
      headerName: "Action",
      flex: 1,
      width: 300,
      renderCell: ({ row }: any) => {
        const isEditDisabled = row?.status === "APPROVED";
        const isDeleteDisabled =
          row?.status === "APPROVED" || row?.status === "REJECTED";
        return (
          <>
            <Tooltip title="Edit Workload">
              <Button
                startIcon={<EditIcon />}
                disabled={isEditDisabled}
                variant="text"
                onClick={() => Router.push(`/workload/edit/${row.id}`)}
              />
            </Tooltip>
            <Tooltip title="Delete Workload">
              <Button
                startIcon={<DeleteIcon />}
                disabled={isDeleteDisabled}
                variant="text"
                color="error"
                onClick={() => onDelete(row?.id)}
              />
            </Tooltip>
          </>
        );
      },
    };
    allColumns = [...allColumns, action];
  }

  const TabComponent = [
    {
      title: userRole === "CL" ? "Workload Requests" : "View history",
      children: (
        <Table
          loading={workloadLoading}
          data={workloadData}
          columns={allColumns}
        />
      ),
    },
  ];
  return (
    <DashboardLayout>
      {userRole !== "CL" ? (
        <>
          {workloadData && workloadData.length === 0 ? (
            <Grid
              style={{ marginBottom: "1rem" }}
              container
              flexDirection={"row"}
              justifyContent={"space-end"}
            >
              <Grid item xs={6}>
                <SectionTitle title={"Workloads"} />
              </Grid>
              <Grid item xs={6}>
                <Button
                  style={{ float: "right" }}
                  size="large"
                  variant="contained"
                  color="primary"
                  href="/workload/create"
                >
                  Create Workload
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid
              style={{ marginBottom: "1rem" }}
              container
              flexDirection={"row"}
              justifyContent={"space-end"}
            >
              <Grid item xs={6}>
                <SectionTitle title={"Workloads"} />
              </Grid>
              <Grid item xs={6}>
                <Tooltip
                  title="You can only create one workload at a time"
                  arrow
                >
                  <Button
                    style={{ float: "right", background: "#ccc" }}
                    size="large"
                    variant="contained"
                  >
                    Create Workload
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          )}
        </>
      ) : (
        <></>
      )}
      <CustomTab data={TabComponent} />
    </DashboardLayout>
  );
}

export const getServerSideProps = (ctx: any) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    ctx?.res?.writeHead(302, { Location: "/login" });
    ctx?.res?.end();
  }
  return { props: {token }};
};
