"use client";

import { DashboardLayout, Table } from "../../components";

import { parseCookies } from "nookies";
import { useModifyUsers, useUser, useUsers } from "../../lib/hooks/user";
import { GridColDef } from "@mui/x-data-grid";
import { Button, Grid, useMediaQuery } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../components/utils/formatError";
import { useContext } from "react";
import { AuthContext } from "../../components/context/authContext";

interface HomeProps {
  token: string;
}

export default function Users({ token }: HomeProps) {
  const { userList, loading } = useUsers();
  const { myData } = useUser();
  const { rejectUser, approveUser, deleteUser } = useModifyUsers();
  const matches = useMediaQuery("(min-width:1200px)");

  const columns = (
    onApprove: any,
    onReject: any,
    onDelete: any
  ): GridColDef[] => {
    return [
      {
        field: "id",
        headerName: "User ID",
      },
      { field: "email", headerName: "Email", flex: 0.7 },
      {
        field: "name",
        headerName: "Name",
        flex: 0.5,
        renderCell: (data) => {
          return data?.row?.firstName + " " + data?.row?.lastName;
        },
      },
      { field: "isVerified", headerName: "Is Verified", flex: 0.4 },
      { field: "isApproved", headerName: "Is Approved", flex: 0.4 },
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
        flex: !matches ? 1 : 0.5,
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
        <Table
          loading={loading}
          data={userNewList || []}
          columns={columns(onApprove, onReject, onDelete)}
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
  return { props: {token }};
};
