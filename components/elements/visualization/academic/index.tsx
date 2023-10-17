import { Divider, Grid, Typography } from "@mui/material";
import styles from "../style.module.scss";
import {
  AppointmentTypeChart,
  DeliveryModePieChart,
} from "../core";
import {
  convertDataForPieChart,
  workloadByUnitAndStudents,
} from "../utils";
import { useEffect, useState } from "react";
import { StudentCard, SubjectCard, UnitCard } from "./student";

const AcademicVisualization: React.FC<any> = ({ workloadData }) => {
  const [unitAndStudents, setUnitAndStudents] = useState<any[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalUnit, setTotalUnit] = useState<number>(0);
  const [totalSubject, setTotalSubject] = useState<number>(0);
  const [deliveryModeData, setDeliveryModeData] = useState<any[]>([]);

  const getWorkloadByUnitAndStudents = (d: any) => {
    const data = workloadByUnitAndStudents(d);
    setUnitAndStudents(data);
  };

  const getWorkloadByDeliveryMode = (d: any) => {
    const data = convertDataForPieChart(d);
    setDeliveryModeData(data);
  };

  const getTotalStudents = (data: any) => {
    try {
      let totalStudents = 0;
      let totalSubjects = 0;
      const units = data?.meta?.units || [];
      units.forEach((unit: any) => {
        const subjects = unit?.subjects || [];
        totalSubjects += subjects.length;
        subjects.forEach((subject: any) => {
          totalStudents += Number(subject?.students);
        });
      });
      setTotalStudents(totalStudents);
      setTotalUnit(units.length);
      setTotalSubject(totalSubjects);
    } catch (err) {}
  };

  useEffect(() => {
    if (workloadData) {
      getWorkloadByUnitAndStudents(workloadData);
      getTotalStudents(workloadData);
      getWorkloadByDeliveryMode(workloadData);
    }
  }, [workloadData]);

  return (
    <Grid container justifyContent={"space-between"}>
      <Grid item xs={12} marginBottom={2}>
        <Grid container justifyContent={"space-between"}>
          <Grid item xs={5}>
            <StudentCard value={totalStudents} />
          </Grid>
          <Grid item xs={5}>
            <UnitCard value={totalUnit} />
          </Grid>
          {/* <Grid item xs={3.5}>
            <SubjectCard value={totalSubject} />
          </Grid> */}
        </Grid>
      </Grid>
      {unitAndStudents && unitAndStudents.length > 0 && (
        <Grid item md={6} xs={12}>
          <div className={styles.cardWithBorder}>
            <Grid item xs={12}>
              <Typography
                fontSize={18}
                fontWeight={500}
                paddingBottom={2}
                color={"gray"}
              >
                Total Students By Unit
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} textAlign={"center"}>
              <AppointmentTypeChart
                data={unitAndStudents}
                index={1}
                onClick={() => {}}
                customWidth={400}
                customHeight={400}
              />
            </Grid>
          </div>
        </Grid>
      )}
      {deliveryModeData && deliveryModeData.length > 0 && (
        <Grid item md={6} xs={12}>
          <div className={styles.cardWithBorder}>
            <Grid item xs={12}>
              <Typography
                fontSize={18}
                fontWeight={500}
                paddingBottom={2}
                color={"gray"}
              >
                Delivery Mode By Students
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} textAlign={"center"}>
              <DeliveryModePieChart data={deliveryModeData} />
            </Grid>
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export { AcademicVisualization };
