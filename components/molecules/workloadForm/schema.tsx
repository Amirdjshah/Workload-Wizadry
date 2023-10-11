import * as yup from "yup";

const moderationSchema = yup.object({
  teachingPeriod: yup.string().required("Teaching period is required"),
  appointmentType: yup.string().required("Teaching period is required"),
  unitCodes: yup.string().required("Unit code is required"),
  noOfStudents: yup
    .number()
    .min(0, "Minimum is 0")
    .required("Number of students is required"),
});
const teachingActivitiesSchema = yup.object({
  f2f: yup.string().required("F2F is required"),
  instances: yup
    .number()
    .min(0, "Minimum is 0")
    .required("Instances is required"),
  hourPerInstance: yup.number().min(0, "Minimum is 0").required("required"),
});

const workloadFormValidatonSchema = yup.object().shape({
  profDevAdjustment: yup.number().required("Professional Development Hours is required"),
  reflectiveAdjustment: yup.number().required("Reflective Hours is required"),
  maxF2FAdjustment: yup.number().required("max F2F Teaching Hours is required"),
  teachingRelatedAdjustment: yup
    .number()
    .required("Teaching Related Hours is required"),
  researchAdjustment: yup.number().required("Research Hours is required"),
  serviceAdjustment: yup.number().required("Service/Ldshp Hours is required"),
  otherAdjustment: yup.number().required("Other (ER Only) Hours is required"),
  partTimeFraction: yup
    .number()
    .min(0, "minimum is 0")
    .max(100, "maximum is 100%")
    .required("Part time fraction is required"),
  percentageLoading: yup
    .number()
    .min(0, "minimum is 0")
    .max(100, "maximum is 100%")
    .required("Percentage loading is required"),
  secondarySupervision: yup
    .number()
    .min(0, "minimum is 0")
    .max(100, "maximum is 100%")
    .required("Seconday Supervision is required"),
  grantFTEPercentage: yup
    .number()
    .min(0, "minimum is 0")
    .max(100, "maximum is 100%")
    .required("Grant FTE Percentage is required"),
  newStaffAllowance: yup.boolean().required("Please select one option"),
  assistantProfessorAdjustment: yup
    .boolean()
    .required("Please select one option"),
  numberOfHDRStudents: yup
    .number()
    .min(0, "minimum is 0")
    .max(6, "maximum is 6")
    .required("Number of HDR students is required"),
  cp3: yup
    .number()
    .min(0, "minimum is 0")
    .max(10, "maximum is 10")
    .required("Value is required"),
  cp6: yup
    .number()
    .min(0, "minimum is 0")
    .max(10, "maximum is 10")
    .required("Value is required"),
  cp12: yup
    .number()
    .min(0, "minimum is 0")
    .max(10, "maximum is 10")
    .required("Value is required"),
  fullTimeStudentsSupervised: yup
    .number()
    .min(0, "minimum is 0")
    .max(100, "maximum is 10")
    .required("Value is required"),
  newUnitsBeingDeveloped: yup
    .number()
    .min(0, "minimum is 0")
    .max(100, "maximum is 10")
    .required("Value is required"),
  moderations: yup
    .array()
    .min(1)
    .of(
      moderationSchema.when([], (moderations, schema) => {
        const anyFieldWithValue = moderations.some(
          (moderation) =>
            moderation.teachingPeriod ||
            moderation.unitCodes ||
            moderation.noOfStudents
        );

        return anyFieldWithValue
          ? moderationSchema
          : moderationSchema.nullable();
      })
    ),
  activities: yup
    .array()
    .min(1)
    .of(
      teachingActivitiesSchema.when([], (activities, schema) => {
        const anyFieldWithValue = activities.some(
          (activity) =>
            activity.f2f || activity.instances || activity.hourPerInstance
        );

        return anyFieldWithValue
          ? teachingActivitiesSchema
          : teachingActivitiesSchema.nullable();
      })
    ),
  //   date: yup.string().required("Date is required"),
  //   appointmentType: yup.string().required("Please select one appointment type"),
  //   loading0: yup.number().required("Loading is required").min(0, "minimum is 0"),
  //   loading1: yup.number().min(0, "minimum is 0").required("Loading is required"),
  //   loading2: yup.number().min(0, "minimum is 0").required("Loading is required"),
  //   loading3: yup.number().min(0, "minimum is 0").required("Loading is required"),
  //   loading4: yup.number().min(0, "minimum is 0").required("Loading is required"),
  //   profDev0: yup.number().min(0, "minimum is 0").required("Prof Dev is required"),
  //   profDev1: yup.number().min(0, "minimum is 0").required("Prof Dev is required"),
  //   profDev2: yup.number().min(0, "minimum is 0").required("Prof Dev is required"),
  //   profDev3: yup.number().min(0, "minimum is 0").required("Prof Dev is required"),
  //   profDev4: yup.number().min(0, "minimum is 0").required("Prof Dev is required"),
  //   reflective0: yup.number().min(0, "minimum is 0").required("Reflective is required"),
  //   reflective1: yup.number().min(0, "minimum is 0").required("Reflective is required"),
  //   reflective2: yup.number().min(0, "minimum is 0").required("Reflective is required"),
  //   reflective3: yup.number().min(0, "minimum is 0").required("Reflective is required"),
  //   reflective4: yup.number().min(0, "minimum is 0").required("Reflective is required"),
  //   maxF2F0: yup.number().min(0, "minimum is 0").required("max F2F Teaching equiv is required"),
  //   maxF2F1: yup.number().min(0, "minimum is 0").required("max F2F Teaching equiv is required"),
  //   maxF2F2: yup.number().min(0, "minimum is 0").required("max F2F Teaching equiv is required"),
  //   maxF2F3: yup.number().min(0, "minimum is 0").required("max F2F Teaching equiv is required"),
  //   maxF2F4: yup.number().min(0, "minimum is 0").required("max F2F Teaching equiv is required"),
  //   teachingRelated0: yup.number().min(0, "minimum is 0").required("Teaching Related is required"),
  //   teachingRelated1: yup.number().min(0, "minimum is 0").required("Teaching Related is required"),
  //   teachingRelated2: yup.number().min(0, "minimum is 0").required("Teaching Related is required"),
  //   teachingRelated3: yup.number().min(0, "minimum is 0").required("Teaching Related is required"),
  //   teachingRelated4: yup.number().min(0, "minimum is 0").required("Teaching Related is required"),
  //   research0: yup.number().min(0, "minimum is 0").required("Research is required"),
  //   research1: yup.number().min(0, "minimum is 0").required("Research is required"),
  //   research2: yup.number().min(0, "minimum is 0").required("Research is required"),
  //   research3: yup.number().min(0, "minimum is 0").required("Research is required"),
  //   research4: yup.number().min(0, "minimum is 0").required("Research is required"),
  //   service0: yup.number().min(0, "minimum is 0").required("Service/Ldshp is required"),
  //   service1: yup.number().min(0, "minimum is 0").required("Service/Ldshp is required"),
  //   service2: yup.number().min(0, "minimum is 0").required("Service/Ldshp is required"),
  //   service3: yup.number().min(0, "minimum is 0").required("Service/Ldshp is required"),
  //   service4: yup.number().min(0, "minimum is 0").required("Service/Ldshp is required"),
  //   other0: yup.number().min(0, "minimum is 0").required("Other (ER Only) is required"),
  //   other1: yup.number().min(0, "minimum is 0").required("Other (ER Only) is required"),
  //   other2: yup.number().min(0, "minimum is 0").required("Other (ER Only) is required"),
  //   other3: yup.number().min(0, "minimum is 0").required("Other (ER Only) is required"),
  //   other4: yup.number().min(0, "minimum is 0").required("Other (ER Only) is required"),
});

export { workloadFormValidatonSchema };
