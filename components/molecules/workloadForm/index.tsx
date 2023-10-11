import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { workloadFormValidatonSchema } from "./schema";
import { Form1 } from "./new/form1";
import { Form2 } from "./new/form2";
import { Form3 } from "./new/form3";
import { Form4 } from "./new/form4";
import { Form0 } from "./new/form0";
import { SummaryTable } from "./new/summaryTable";
import { WorkloadTableData, calculateAllDataForTable } from "./utils";
import {
  Box,
  CircularProgress,
  Grid,
  InputLabel,
  Modal,
  Tab,
  Tabs,
} from "@mui/material";
import { useRouter } from "next/router";
import { useModifyWorkload, useWorkload } from "../../../lib/hooks/workload";
import { useUser } from "../../../lib/hooks/user";
import { Form5 } from "./new/form5";
import { Button, TextField } from "../../atom";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { enqueueSnackbar } from "notistack";
import { formatErrorMessage } from "../../utils/formatError";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const generateModeration = () => ({
  teachingPeriod: 1,
  unitCodes: "",
  noOfStudents: "",
});
const generateTeachingActivities = () => ({
  f2f: "",
  instances: 0,
  hourPerInstance: 0,
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface IProps {
  initialValues?: any;
  isEdit?: boolean;
  view: boolean;
  status?: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const WorkloadForm: React.FC<IProps> = ({
  initialValues,
  isEdit,
  view,
  status,
}) => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState("");
  const [rejectLoading, setRejectLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);

  const { addWorkload, editWorkload, acceptWorkload, rejectWorkload } =
    useModifyWorkload();
  const { myData, loading } = useUser();

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

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("values", values);
    },
    validationSchema: workloadFormValidatonSchema,
  });

  const router = useRouter();

  const id = router?.query?.id;

  const handleAddModerations = () => {
    let data = formik.values.moderations;
    data.push(generateModeration());
    formik.setFieldValue("moderations", data);
  };
  const handleAddActivities = () => {
    let data = formik.values.activities;
    data.push(generateTeachingActivities());
    formik.setFieldValue("activities", data);
  };

  const onClickNext = (done: boolean = false) => {
    if (view === true) {
      setValue(value + 1);
      return;
    }
    let data: any = {
      status: "DRAFT",
      user_id: myData?.user?.id,
      meta: formik.values,
    };
    if (done) {
      data["status"] = "PENDING";
      if (isEdit) {
        data["id"] = id;
        editWorkload.mutate(data, {
          onSuccess: (res) => {
            router.push("/workload");
          },
        });
      } else {
        addWorkload.mutate(data, {
          onSuccess: (res) => {
            router.push("/workload");
          },
        });
      }
    } else {
      if (isEdit) {
        data["id"] = id;
        editWorkload.mutate(data, {
          onSuccess: (res) => {
            setValue(value + 1);
          },
        });
      } else {
        addWorkload.mutate(data, {
          onSuccess: (res) => {
            setValue(value + 1);
          },
        });
      }
    }
  };

  const onClickPrevious = () => {
    if (view === true) {
      setValue(value - 1);
      return;
    }
    setValue(value - 1);
    let data: any = {
      status: "DRAFT",
      user_id: myData?.user?.id,
      meta: formik.values,
    };

    if (isEdit) {
      data["id"] = id;
      editWorkload.mutate(data);
    } else {
      addWorkload.mutate(data);
    }
  };

  useEffect(() => {
    if (formik.values) {
      const data = calculateAllDataForTable(formik.values, tableData);
      setTableData({
        ...tableData,
        ...data,
      });
    }
  }, [formik.values]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onApprove = () => {
    setApproveLoading(true);
    // approve the workload and update the status
    acceptWorkload.mutate(
      {
        id,
      },
      {
        onSuccess: (res: any) => {
          setOpen(false);
          router.push("/workload");
          enqueueSnackbar({
            message: "Workload approved successfully.",
            autoHideDuration: 2000,
            variant: "success",
          });
          setApproveLoading(false);
        },
        onError: (err: any) => {
          let message = formatErrorMessage(err?.response?.data);
          enqueueSnackbar({
            message,
            autoHideDuration: 2000,
            variant: "error",
            className: "error-snackbar",
          });
          setApproveLoading(false);
        },
      }
    );
  };

  const onReject = () => {
    // open then reason modal
    setOpen(true);
  };

  const submitReject = () => {
    if (rejectReason === "") {
      setRejectError("Please enter a reason");
      return;
    }
    setRejectLoading(true);
    const data = {
      id: id,
      reason: rejectReason,
    };
    rejectWorkload.mutate(data, {
      onSuccess: (res) => {
        setOpen(false);
        enqueueSnackbar({
          message: "Workload rejected successfully.",
          autoHideDuration: 2000,
          variant: "success",
        });
        router.push("/workload");
        setRejectLoading(false);
      },
      onError: (err: any) => {
        let message = formatErrorMessage(err?.response?.data);
        enqueueSnackbar({
          message,
          autoHideDuration: 2000,
          variant: "error",
          className: "error-snackbar",
        });
        setRejectLoading(false);
      },
    });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={rejectLoading ? () => {} : () => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <Box sx={style}>
          <Grid container>
            <Grid item xs={12}>
              <Grid item textAlign={"left"}>
                <InputLabel>Reject Reason</InputLabel>
              </Grid>
              <TextField
                type="text"
                id="outlined-start-adornment"
                name="rejectReason"
                fullWidth
                value={rejectReason}
                onChange={(e) => {
                  if (e?.target?.value !== "") {
                    setRejectError("");
                  }
                  setRejectReason(e.target.value);
                }}
                error={rejectError !== ""}
                helperText={rejectError}
              />
            </Grid>
            <Grid item xs={12} marginTop={2}>
              <Grid container gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitReject}
                  disabled={rejectLoading}
                  style={{ width: "80px" }}
                >
                  {rejectLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <span>Submit</span>
                  )}
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  variant="contained"
                  color="error"
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Grid container flexDirection={"row"}>
        <Grid item xs={view ? 9 : 12}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Appointment Type" {...a11yProps(0)} />
            <Tab label="Staffing Allowance & Research" {...a11yProps(1)} />
            <Tab label="Teaching" {...a11yProps(2)} />
            <Tab label="General Teaching" {...a11yProps(3)} />
            <Tab label="Units" {...a11yProps(4)} />
            <Tab label="Adjustments" {...a11yProps(5)} />
          </Tabs>
        </Grid>
        <Grid item xs={3}>
          {view && (
            <Grid container gap={1} justifyContent={"flex-end"}>
              {approveLoading ? (
                <Button
                  variant="contained"
                  disabled={true}
                  color="secondary"
                  onClick={() => {}}
                  style={{ width: "100px" }}
                >
                  {approveLoading ? (
                    <CircularProgress size={24} style={{ color: "#000" }} />
                  ) : (
                    <span>Approve</span>
                  )}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<DoneIcon />}
                  disabled={status === "APPROVED" || status === "REJECTED"}
                  color="secondary"
                  onClick={() => onApprove()}
                >
                  Approve
                </Button>
              )}
              <Button
                startIcon={<CloseIcon />}
                disabled={status === "APPROVED" || status === "REJECTED"}
                variant="contained"
                color="error"
                onClick={() => onReject()}
              >
                {loading ? (
                  <CircularProgress size={24} style={{ color: "#000" }} />
                ) : (
                  <span>Reject</span>
                )}
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <CustomTabPanel value={value} index={0}>
        <Form0
          formik={formik as any}
          onClickNext={onClickNext}
          table={
            <SummaryTable tableData={tableData} formData={formik.values} />
          }
          loading={addWorkload.isLoading || editWorkload.isLoading}
          view={view}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Form1
          formik={formik as any}
          onClickNext={onClickNext}
          onClickPrevious={onClickPrevious}
          table={
            <SummaryTable tableData={tableData} formData={formik.values} />
          }
          loading={addWorkload.isLoading || editWorkload.isLoading}
          view={view}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Form2
          formik={formik as any}
          handleAddModerations={handleAddModerations}
          onClickNext={onClickNext}
          onClickPrevious={onClickPrevious}
          table={
            <SummaryTable tableData={tableData} formData={formik.values} />
          }
          loading={addWorkload.isLoading || editWorkload.isLoading}
          view={view}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Form3
          formik={formik as any}
          handleAddActivities={handleAddActivities}
          onClickNext={onClickNext}
          onClickPrevious={onClickPrevious}
          table={
            <SummaryTable tableData={tableData} formData={formik.values} />
          }
          loading={addWorkload.isLoading || editWorkload.isLoading}
          view={view}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Form4
          formik={formik as any}
          onClickNext={onClickNext}
          onClickPrevious={onClickPrevious}
          table={
            <SummaryTable tableData={tableData} formData={formik.values} />
          }
          loading={addWorkload.isLoading || editWorkload.isLoading}
          view={view}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <Form5
          formik={formik as any}
          onClickNext={onClickNext}
          onClickPrevious={onClickPrevious}
          table={
            <SummaryTable tableData={tableData} formData={formik.values} />
          }
          loading={addWorkload.isLoading || editWorkload.isLoading}
          view={view}
        />
      </CustomTabPanel>
    </>
  );
};

export { WorkloadForm };
