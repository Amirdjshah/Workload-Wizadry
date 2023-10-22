"use client";

import { DashboardLayout } from "../../components";

import { parseCookies } from "nookies";
import { useModifyUsers, useUser, useUsers } from "../../lib/hooks/user";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../components/utils/formatError";
import { useEffect, useState } from "react";

const ALL_COLUMNS = {
    sn: true,
    email: true,
    name: true,
    isVerified: true,
    isApproved: true,
    role: true,
    action: true,
}

const MOBILE_COLUMNS = {
    sn: true,
    email: false,
    name: true,
    isApproved: true,
    isVerified: false,
    role: false,
    action: true,
}
interface HomeProps {
  token: string;
}

export default function Users({ token }: HomeProps) {
  const { userList, loading } = useUsers();
  const { myData } = useUser();
  const { rejectUser, approveUser, deleteUser } = useModifyUsers();
  const sm = useMediaQuery((theme: any) => theme.breakpoints.up('sm'));
  const md = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const [columnVisible, setColumnVisible] = useState<any>(ALL_COLUMNS)

  useEffect(() => {
    const newColumns = !md ? MOBILE_COLUMNS : ALL_COLUMNS;
    setColumnVisible(newColumns);
  }, [md]);

  const columns = (
    onApprove: any,
    onReject: any,
    onDelete: any
  ): GridColDef[] => {
    return [
      {
        field: "sn",
        headerName: "S.N",
        flex: sm ? 0 : 0.2,
      },
      { field: "email", headerName: "Email", flex: 0.6 },
      {
        field: "name",
        headerName: "Name",
        flex: 0.5,
        renderCell: (data) => {
          return data?.row?.firstName + " " + data?.row?.lastName;
        },
      },
      { field: "isVerified", headerName: "Is Verified", flex: sm ? 0.2 : 0.4 },
      { field: "isApproved", headerName: "Is Approved", flex: sm ?  0.2 : 0.4 },
      {
        field: "role",
        headerName: "Role",
        flex: 0.4,
        renderCell: (data) => {
          return data?.row?.role?.roleName;
        },
      },
      {
        field: "action",
        flex: sm ? 1 : 0.5,
        headerName: "Action",
        renderCell: (data) => {
          if (data?.row?.isApproved === false) {
            return (
              <Grid container gap={1}>
                <Button
                  variant="contained"
                  onClick={() => onApprove(data?.row?.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onReject(data?.row?.id)}
                >
                  Delete
                </Button>
              </Grid>
            );
          } else {
            return (
              <Button
                color="error"
                variant="contained"
                onClick={() => onDelete(data?.row?.id)}
              >
                Deactivate
              </Button>
            );
          }
        },
      },
    ];
  };

  const userNewList = userList?.filter((item: any) => {
    return item?.email !== myData?.user?.email;
  });

  const onApprove = (id: string) => {
    approveUser.mutate(
      { id },
      {
        onSuccess: (data: any) => {
          enqueueSnackbar({
            message: data?.data?.message,
            variant: "success",
          });
        },
        onError: (err: any) => {
          let message = formatErrorMessage(err?.response?.data);
          enqueueSnackbar({
            message,
            autoHideDuration: 2000,
            variant: "error",
            className: "error-snackbar",
          });
        },
      }
    );
  };

  const onReject = (id: string) => {
    rejectUser.mutate(
      { id },
      {
        onSuccess: (data: any) => {
          enqueueSnackbar({
            message: data?.data?.message,
            variant: "success",
          });
        },
        onError: (err: any) => {
          let message = formatErrorMessage(err?.response?.data);
          enqueueSnackbar({
            message,
            autoHideDuration: 2000,
            variant: "error",
            className: "error-snackbar",
          });
        },
      }
    );
  };

  const onDelete = (id: string) => {
    deleteUser.mutate(
      { id },
      {
        onSuccess: (data: any) => {
          enqueueSnackbar({
            message: data?.data?.message,
            variant: "success",
          });
        },
        onError: (err: any) => {
          let message = formatErrorMessage(err?.response?.data);
          enqueueSnackbar({
            message,
            autoHideDuration: 2000,
            variant: "error",
            className: "error-snackbar",
          });
        },
      }
    );
  };

  return (
    <>
      <DashboardLayout>
        <DataGrid
          rows={userNewList || []}
          initialState={{}}
          rowSelection={false}
          columnHeaderHeight={55}
          loading={loading}
        //   sx={sx}
          columns={columns(onApprove, onReject, onDelete)}
          columnVisibilityModel={columnVisible}
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
      </DashboardLayout>
    </>
  );
}

export const getServerSideProps = (ctx: any) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    ctx?.res?.writeHead(302, { Location: "/login" });
    ctx?.res?.end();
  }
  return { props: { token } };
};
