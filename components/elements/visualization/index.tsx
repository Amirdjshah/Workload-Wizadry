"use client";

import { Divider, Grid, Typography } from "@mui/material";
import styles from "./style.module.scss";
import {
  AppointmentTypeChart,
  AppointmentTypePieChart,
  StackedBarChart,
} from "./core";
import {
  workloadByAppointmentType,
  workloadByDeliveryMode,
  workloadBySemesterPoint,
  workloadByStatus,
  workloadBynewStaffAllowance,
} from "./utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

  const router = useRouter();

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

  const onCliCkAppointmentType = (data: any) => {
    if (data?.type) {
      router.push(`/workload/filter?type=${data?.type}`);
    }
  };

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
              <AppointmentTypePieChart
                onClick={onCliCkAppointmentType}
                data={appointmentType}
                index={1}
              />
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
              <AppointmentTypeChart
                data={newStaffAllowance}
                onClick={() => {}}
                index={1}
              />
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
              <AppointmentTypeChart
                onClick={() => {}}
                data={semesterPoint}
                index={2}
              />
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
              <AppointmentTypePieChart
                onClick={() => {}}
                data={workloadStatus}
                index={2}
              />
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
