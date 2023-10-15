"use client";

import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { CustomTab, DashboardLayout, Table } from "../../../components";
import { parseCookies } from "nookies";
import { useWorkload } from "../../../lib/hooks/workload";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useSearchParams } from "next/navigation";
import { TableComponent } from "../../../components/molecules/workloadForm/new/tableComponent";
import {
  WorkloadTableData,
  calculateAllDataForTable,
} from "../../../components/molecules/workloadForm/utils";
import { verify } from "jsonwebtoken";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

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
  const [isClient, setIsClient] = useState(false);
  const [filter, setFilter] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const [tableData, setTableData] = useState<WorkloadTableData>({
    loading0: 0,
    profDev0: 40,
    reflective0: 35,
    maxF2F0: 550,
    teachingRelated0: 825,
    research0: 0,
    service0: 250,
    other0: 0,
  });

  const { workloadData, workloadLoading } = useWorkload(filter);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (type) {
      setFilter({ type });
    }
  }, [type]);

  const onClickModal = (meta: any) => {
    setOpen(true);
    setFormData(meta);
  };

  let allColumns = columns;
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
        <Tooltip title="View Calculation Table">
          <Button
            startIcon={<VisibilityIcon />}
            variant="text"
            onClick={() => onClickModal(row?.meta)}
          >
            View Table
          </Button>
        </Tooltip>
      );
    },
  };
  allColumns = [...allColumns, email, action];

  const TabComponent = [
    {
      title: "Workload Requests",
      children: (
        <Table
          loading={workloadLoading}
          data={workloadData}
          columns={allColumns}
        />
      ),
    },
  ];

  useEffect(() => {
    if (formData) {
      const data = calculateAllDataForTable(formData, tableData);
      setTableData({
        ...tableData,
        ...data,
      });
    }
  }, [formData]);

  return (
    <DashboardLayout>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Grid container>
          <Box sx={{ ...style, width: "95%" }}>
            <Typography style={{ fontSize: "18px", marginBottom: "10px" }}>
              Workload Calculation
            </Typography>
            <TableComponent
              tableData={tableData}
              formData={formData}
              modal={true}
            />
          </Box>
        </Grid>
      </Modal>
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
  const secretKey = process.env.SECRET_KEY || "secret";
  const decoded: any = verify(token, secretKey);
  const roleCode = decoded?.roleCode;
  if(roleCode === "AD" || roleCode !== "SP"){
    ctx?.res?.writeHead(302, { Location: "/login" });
    ctx?.res?.end();
  }
  return { props: { token } };
};
