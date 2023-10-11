"use client";

import { DashboardLayout } from "../../../components";
import { parseCookies } from "nookies";
import { WorkloadForm } from "../../../components/molecules/workloadForm/";

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
const generateSubjects = () => ({
  unit_name: "",
  unit_code: "",
  delivery_mode: "on_campus",
  credit_points: 3,
  students: 0,
});
const generateLectures = () => ({
  f2f: "",
  instance: 0,
  hour_per_instance: 0,
  credit_points: 3,
  students: 0,
});

const generateUnits = (semester: string) => ({
  unit_code: semester,
  unit_convening: false,
  co_convening_fraction: 0,
  cotaught: false,
  multi_modal: false,
  team_teaching: false,
  significant_revision: false,
  no_of_week_revised: 0,
  new_videos: false,
  new_videos_hours: 0,
  new_teacher: false,
  subjects: [
    {
      ...generateSubjects(),
    },
  ],
  lectures: [
    {
      ...generateLectures(),
    },
  ],
});

const INITIAL_VALUES = {
  comment: "",
  partTimeFraction: 0,
  percentageLoading: 0,
  profDevAdjustment: 0,
  reflectiveAdjustment: 0,
  maxF2FAdjustment: 0,
  teachingRelatedAdjustment: 0,
  researchAdjustment: 0,
  serviceAdjustment: 0,
  otherAdjustment: 0,
  newStaffAllowance: false,
  assistantProfessorAdjustment: false,
  numberOfHDRStudents: 0,
  secondarySupervision: 0,
  grantFTEPercentage: 0,
  otherResearchActivity: 0,
  cp3: 0,
  cp6: 0,
  cp12: 0,
  fullTimeStudentsSupervised: 0,
  newUnitsBeingDeveloped: 0,
  appointmentType: "EF",
  moderations: [
    {
      ...generateModeration(),
    },
  ],
  activities: [
    {
      ...generateTeachingActivities(),
    },
  ],
  units: [
    {
      ...generateUnits("s1"),
    },
    {
      ...generateUnits("s2"),
    },
  ],
};

export default function CreateWorkload() {
  return (
    <DashboardLayout>
      <WorkloadForm
        initialValues={INITIAL_VALUES}
        isEdit={false}
        view={false}
      />
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
