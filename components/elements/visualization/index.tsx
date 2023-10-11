import { Divider, Grid, Typography } from "@mui/material";
import styles from "./style.module.scss";
import {
  AppointmentTypeChart,
  AppointmentTypePieChart,
  StackedBarChart,
} from "./core";
import { useWorkload } from "../../../lib/hooks/workload";
import {
  workloadByAppointmentType,
  workloadByDeliveryMode,
  workloadBySemesterPoint,
  workloadByStatus,
  workloadBynewStaffAllowance,
} from "./utils";
import { useEffect, useState } from "react";

const VisualizationData: React.FC<any> = ({ workloadData }) => {
  const [appointmentType, setAppointmentType] = useState<any[]>([]);
  const [workloadStatus, setWorkloadStatus] = useState<any[]>([]);
  const [newStaffAllowance, setNewStaffAllowance] = useState<any[]>([]);
  const [semesterPoint, setSemesterPoint] = useState<any[]>([]);
  const [deliveryMode, setDeliveryMode] = useState<any[]>([]);

  const getWorkloadByAppointmentType = (d: any) => {
    const data = workloadByAppointmentType(d);
    setAppointmentType(data);
  };

  const getWorkloadByNewStaffAllowance = (d: any) => {
    const data = workloadBynewStaffAllowance(d);
    setNewStaffAllowance(data);
  };
  const getWorkloadBySemesterPoint = (d: any) => {
    const data = workloadBySemesterPoint(d);
    setSemesterPoint(data);
  };
  const getWorkloadDeliveryMode = (d: any) => {
    const data = workloadByDeliveryMode(d);
    setDeliveryMode(data);
  };
  const getWorkloadStatus = (d: any) => {
    const data = workloadByStatus(d);
    setWorkloadStatus(data);
  };

  useEffect(() => {
    if (workloadData) {
      getWorkloadByAppointmentType(workloadData);
      getWorkloadByNewStaffAllowance(workloadData);
      getWorkloadBySemesterPoint(workloadData);
      getWorkloadDeliveryMode(workloadData);
      getWorkloadStatus(workloadData);
    }
  }, [workloadData]);

  return (
    <Grid container justifyContent={"space-between"}>
      {appointmentType && appointmentType.length > 0 && (
        <Grid item md={6} xs={12}>
          <div className={styles.cardWithBorder}>
            <Grid item xs={12}>
              <Typography
                fontSize={18}
                fontWeight={500}
                paddingBottom={2}
                marginRight={10}
                color={"gray"}
              >
                All Staff appointment type
              </Typography>
              <Divider />
            </Grid>

            <Grid item xs={12} textAlign={"center"}>
              <AppointmentTypePieChart data={appointmentType} index={1} />
            </Grid>
          </div>
        </Grid>
      )}
      {newStaffAllowance && newStaffAllowance.length > 0 && (
        <Grid item md={6} xs={12}>
          <div className={styles.cardWithBorder}>
            <Grid item xs={12}>
              <Typography
                fontSize={18}
                fontWeight={500}
                paddingBottom={2}
                color={"gray"}
              >
                New Staff Allowance
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} textAlign={"center"}>
              <AppointmentTypeChart data={newStaffAllowance} index={1} />
            </Grid>
          </div>
        </Grid>
      )}
      {semesterPoint && semesterPoint.length > 0 && (
        <Grid item md={6} xs={12}>
          <div className={styles.cardWithBorder}>
            <Grid item xs={12}>
              <Typography
                fontSize={18}
                fontWeight={500}
                paddingBottom={4}
                color={"gray"}
              >
                Adjustment Stacked Bar Chart
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} textAlign={"center"}>
              <AppointmentTypeChart data={semesterPoint} index={2} />
            </Grid>
          </div>
        </Grid>
      )}
      {workloadStatus && workloadStatus.length > 0 && (
        <Grid item md={6} xs={12}>
          <div className={styles.cardWithBorder}>
            <Grid item xs={12}>
              <Typography
                fontSize={18}
                fontWeight={500}
                paddingBottom={2}
                marginRight={10}
                color={"gray"}
              >
                All Workload by status
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} textAlign={"center"}>
              <AppointmentTypePieChart data={workloadStatus} index={2} />
            </Grid>
          </div>
        </Grid>
      )}
      {deliveryMode && deliveryMode.length > 0 && (
      <Grid item xs={12} md={12}>
        <div className={styles.cardWithBorder}>
          <Grid item xs={12}>
            <Typography
              fontSize={18}
              fontWeight={500}
              paddingBottom={4}
              color={"gray"}
            >
              Delivery Mode By Students
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <StackedBarChart data={deliveryMode} />
          </Grid>
        </div>
      </Grid>
      )}
    </Grid>
  );
};

export { VisualizationData };
