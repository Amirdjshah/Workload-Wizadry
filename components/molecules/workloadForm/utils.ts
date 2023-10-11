export interface WorkloadTableData {
  loading0: number;
  //   loading1: number;
  //   loading2: number;
  //   loading3: number;
  //   loading4: number;
  profDev0: number;
  //   profDev1: number;
  //   profDev2: number;
  //   profDev3: number;
  //   profDev4: number;
  reflective0: number;
  //   reflective1: number;
  //   reflective2: number;
  //   reflective3: number;
  //   reflective4: number;
  maxF2F0: number;
  //   maxF2F1: number;
  //   maxF2F2: number;
  //   maxF2F3: number;
  //   maxF2F4: number;
  teachingRelated0: number;
  //   teachingRelated1: number;
  //   teachingRelated2: number;
  //   teachingRelated3: number;
  //   teachingRelated4: number;
  research0: number;
  //   research1: number;
  //   research2: number;
  //   research3: number;
  //   research4: number;
  service0: number;
  //   service1: number;
  //   service2: number;
  //   service3: number;
  //   service4: number;
  other0: number;
  //   other1: number;
  //   other2: number;
  //   other3: number;
  //   other4: number;
  //   total0: number;
  //   total1: number;
  //   total2: number;
  //   total3: number;
  //   total4: number;
}

export interface IFormikValues {
  partTimeFraction: number;
  percentageLoading: number;
  profDevAdjustment: number;
  reflectiveAdjustment: number;
  maxF2FAdjustment: number;
  teachingRelatedAdjustment: number;
  researchAdjustment: number;
  serviceAdjustment: number;
  otherAdjustment: number;
  newStaffAllowance: boolean;
  assistantProfessorAdjustment: boolean;
  numberOfHDRStudents: number;
  secondarySupervision: number;
  grantFTEPercentage: number;
  otherResearchActivity: number;
  cp3: number;
  cp6: number;
  cp12: number;
  fullTimeStudentsSupervised: number;
  newUnitsBeingDeveloped: number;
  appointmentType: string;
  comment: string;
  moderations: {
    teachingPeriod: number;
    unitCodes: string;
    noOfStudents: string;
  }[];
  activities: {
    f2f: string;
    instances: number;
    hourPerInstance: number;
  }[];
  units: {
    unit_code: string;
    unit_convening: boolean;
    co_convening_fraction: number;
    cotaught: boolean;
    multi_modal: boolean;
    team_teaching: boolean;
    significant_revision: boolean;
    no_of_week_revised: number;
    new_videos: boolean;
    new_videos_hours: number;
    new_teacher: boolean;
    subjects: {
      unit_name: string;
      unit_code: string;
      delivery_mode: string;
      credit_points: number;
      students: number;
    }[];
    lectures: {
      f2f: string;
      instance: number;
      hour_per_instance: number;
      credit_points: number;
      students: number;
    }[];
  }[];
}

export const calculateAllDataForTable = (
  values: any,
  stateValues: WorkloadTableData
): WorkloadTableData => {
  const total0 =
    stateValues.loading0 +
    stateValues.profDev0 +
    stateValues.reflective0 +
    stateValues.maxF2F0 +
    stateValues.teachingRelated0 +
    stateValues.research0 +
    stateValues.service0 +
    stateValues.other0;
  if (values?.appointmentType === "EF") {
    // return ef values

    // values.partTimeFraction=(F10*$B$18)-F10/SUM($F$10:$J$10)*$B$19*$K$10
    // const maxF2F1 = (F10 * B18) - F10/SUM(f10:j10) * B19 * K10
    //   stateValues.maxF2F0 * values.partTimeFraction -
    //   (stateValues.maxF2F0 / 1) * values?.percentageLoading * total0;

    const maxF2F1 =
      stateValues.maxF2F0 * values.partTimeFraction -
      (stateValues.maxF2F0 /
        (stateValues.maxF2F0 +
          values.teachingRelated0 +
          stateValues.research0 +
          stateValues.service0 +
          stateValues.other0)) *
        values.percentageLoading *
        total0;

    return {
      loading0: 0,
      //   loading1: 680,
      //   loading2: 0,
      //   loading3: 680,
      //   loading4: 680,
      profDev0: 40,
      //   profDev1: 40,
      //   profDev2: 0,
      //   profDev3: 40,
      //   profDev4: 40,
      reflective0: 35,
      //   reflective1: 35,
      //   reflective2: 0,
      //   reflective3: 35,
      //   reflective4: 35,
      maxF2F0: 550,
      //   maxF2F1: maxF2F1,
      //   maxF2F2: 0,
      //   maxF2F3: 319.8,
      //   maxF2F4: 197,
      teachingRelated0: 825,
      //   teachingRelated1: 479.8,
      //   teachingRelated2: 0,
      //   teachingRelated3: 479.8,
      //   teachingRelated4: 295.5,
      research0: 0,
      //   research1: 0,
      //   research2: 0,
      //   research3: 0,
      //   research4: 346,
      service0: 250,
      //   service1: 145.4,
      //   service2: 0,
      //   service3: 145.4,
      //   service4: 145.4,
      other0: 0,
      //   other1: 0,
      //   other2: 0,
      //   other3: 0,
      //   other4: 0,
    };
  } else if (values?.appointmentType === "ER") {
    return {
      ...stateValues,
      maxF2F0: 288,
      //   maxF2F1: 167.5,
      //   maxF2F2: 0,
      //   maxF2F3: 167.5,
      //   maxF2F4: 132,
      teachingRelated0: 432,
      //   teachingRelated1: 251.2,
      //   teachingRelated2: 0,
      //   teachingRelated3: 251.2,
      //   teachingRelated4: 198,
      research0: 595,
      //   research1: 346,
      //   research2: 0,
      //   research3: 346,
      //   research4: 346,
      service0: 250,
      //   service1: 145.4,
      //   service2: 0,
      //   service3: 145.4,
      //   service4: 145.4,
      other0: 60,
      //   other1: 34.9,
      //   other2: 0,
      //   other3: 34.9,
      //   other4: 0,
    };
  } else if (values?.appointmentType === "RF") {
    return {
      ...stateValues,
      maxF2F0: 75,
      //   maxF2F1: 43.6,
      //   maxF2F2: 0,
      //   maxF2F3: 43.6,
      //   maxF2F4: 132,
      teachingRelated0: 112.5,
      //   teachingRelated1: 65.4,
      //   teachingRelated2: 0,
      //   teachingRelated3: 65.4,
      //   teachingRelated4: 198,
      research0: 1187.5,
      //   research1: 690.6,
      //   research2: 0,
      //   research3: 690.6,
      //   research4: 346,
      service0: 250,
      //   service1: 145.4,
      //   service2: 0,
      //   service3: 145.4,
      //   service4: 145.4,
      other0: 0,
      //   other1: 0,
      //   other2: 0,
      //   other3: 0,
      //   other4: 0,
    };
  }
  return stateValues;
};

export const getConfigValue = (
  key: string,
  values: any[],
  defaultValue: number = 0,
  getMeta: boolean = false
) => {
  //   if (!values || values.length === 0) return defaultValue;
  const configValue = values?.find((value: any) => value.key === key);
  if (getMeta) {
    return {
      value: configValue?.value || defaultValue,
      meta: configValue?.meta,
    };
  }
  return configValue?.value || defaultValue;
};

export const getTotal0 = (tableData: any) => {
  return (
    tableData?.loading0 +
    tableData?.profDev0 +
    tableData?.reflective0 +
    tableData?.maxF2F0 +
    tableData?.teachingRelated0 +
    tableData?.research0 +
    tableData?.service0 +
    tableData?.other0
  ).toFixed(1);
};

export const getMaxF2F1 = (tableData: any, formData: any, total0: any) => {
  return (
    tableData?.maxF2F0 * (formData?.partTimeFraction / 100) -
    (tableData?.maxF2F0 /
      (tableData?.maxF2F0 +
        tableData?.teachingRelated0 +
        tableData?.research0 +
        tableData?.service0 +
        tableData?.other0)) *
      (formData?.percentageLoading / 100) *
      total0
  );
};

export const getTeachingRelated1 = (
  tableData: any,
  formData: any,
  total0: any
) => {
  return (
    tableData?.teachingRelated0 * (formData?.partTimeFraction / 100) -
    (tableData?.teachingRelated0 /
      (tableData?.maxF2F0 +
        tableData?.teachingRelated0 +
        tableData?.research0 +
        tableData?.service0 +
        tableData?.other0)) *
      (formData?.percentageLoading / 100) *
      total0
  );
};

export const getResearch1 = (tableData: any, formData: any, total0: any) => {
  return (
    tableData?.research0 * (formData?.partTimeFraction / 100) -
    (tableData?.research0 /
      (tableData?.maxF2F0 +
        tableData?.teachingRelated0 +
        tableData?.research0 +
        tableData?.service0 +
        tableData?.other0)) *
      (formData?.percentageLoading / 100) *
      total0
  );
};
export const getService1 = (tableData: any, formData: any, total0: any) => {
  return (
    tableData?.service0 * (formData?.partTimeFraction / 100) -
    (tableData?.service0 /
      (tableData?.maxF2F0 +
        tableData?.teachingRelated0 +
        tableData?.research0 +
        tableData?.service0 +
        tableData?.other0)) *
      (formData?.percentageLoading / 100) *
      total0
  );
};
export const getOther1 = (tableData: any, formData: any, total0: any) => {
  return (
    tableData?.other0 * (formData?.partTimeFraction / 100) -
    (tableData?.other0 /
      (tableData?.maxF2F0 +
        tableData?.teachingRelated0 +
        tableData?.research0 +
        tableData?.service0 +
        tableData?.other0)) *
      (formData?.percentageLoading / 100) *
      total0
  );
};
