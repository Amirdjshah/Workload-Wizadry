export const modeLabelMap: { [key: string]: string } = {
  on_campus: "On Campus",
  flexible: "Flexible",
  online: "Online",
  intensive: "Intensive",
  "self-paced": "Self-paced",
  research: "Research",
  "online-exam": "Online Exam",
  weekend: "Weekend",
  evening: "Evening",
  sponsor: "Sponsor",
  internplace: "Internplace",
  project: "Project",
};

export const workloadByAppointmentType = (data: any[]) => {
  if (!data || data?.length <= 0) {
    return [];
  }
  const newData = data?.map((workload: any) => {
    const meta = workload?.meta;
    return meta?.appointmentType;
  });

  const count = newData.reduce(
    (acc, curr) => {
      if (typeof acc[curr] == "undefined") {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    },

    {}
  );

  const result = Object.keys(count).map((key) => {
    return { type: key, count: count[key] };
  });
  return result;
};

export const workloadByStatus = (data: any[]) => {
  if (!data || data?.length <= 0) {
    return [];
  }
  const newData = data?.map((workload: any) => {
    const status = workload?.status;
    return status;
  });

  const count = newData.reduce(
    (acc, curr) => {
      if (typeof acc[curr] == "undefined") {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    },

    {}
  );

  const result = Object.keys(count).map((key) => {
    return { type: key, count: count[key] };
  });
  return result;
};

export const workloadBynewStaffAllowance = (data: any[]) => {
  if (!data || data?.length <= 0) {
    return [];
  }
  const newData = data?.map((workload: any) => {
    const meta = workload?.meta;
    return meta?.newStaffAllowance ? "YES" : "NO";
  });

  const count = newData.reduce(
    (acc: any, curr: any) => {
      if (typeof acc[curr] == "undefined") {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    },

    {}
  );

  const result = Object.keys(count).map((key) => {
    return { type: key, count: count[key] };
  });
  return result;
};

export const workloadByUnitAndStudents = (data: any) => {
  if (!data || data?.length <= 0) {
    return [];
  }
  const units = data?.meta?.units || [];

  // return units vs students
  const result = units.map((unit: any) => {
    const unit_code = unit.unit_code;
    let unitCode: string | null = null;
    if (unit_code === "s1") {
      unitCode = "Semester 1";
    } else if (unit_code === "s2") {
      unitCode = "Semester 2";
    } else if (unit_code === "ws") {
      unitCode = "Winter Semester";
    } else if (unit_code === "ss") {
      unitCode = "Summer Semester";
    } else {
      unitCode = unit.unit_code;
    }
    const subjects = unit.subjects;
    const totalStudents = subjects.reduce((acc: any, curr: any) => {
      return acc + curr.students;
    }, 0);
    return { type: unitCode, count: totalStudents };
  });

  return result;
};

interface OutputData {
  type: string;
  count: number;
}
export const workloadBySemesterPoint = (data: any): OutputData[] => {
  const counts: Record<string, number> = {};

  data.forEach((item: any) => {
    for (const key in item.meta) {
      if (
        item.meta.hasOwnProperty(key) &&
        ["cp3", "cp6", "cp12"].includes(key)
      ) {
        const type = key.toUpperCase();
        const count = item.meta[key];
        counts[type] = (counts[type] || 0) + count;
      }
    }
  });

  const result: OutputData[] = [];

  for (const type in counts) {
    if (counts.hasOwnProperty(type)) {
      result.push({ type, count: counts[type] });
    }
  }

  return result;
};

export const convertDataForScatterPlot = (rawData: any) =>  {
    const moderations = rawData?.meta?.moderations || [];
    
    // Filter out items with valid unitCodes and noOfStudents
    const validModerations = moderations.filter((moderation: any) => {
      return moderation.unitCodes !== undefined && moderation.noOfStudents !== undefined;
    });
    
    // Map the valid moderation data into an array of objects suitable for Scatter Plot
    const scatterData = validModerations.map((moderation: any) => ({
      unitCodes: moderation.unitCodes,
      noOfStudents: parseInt(moderation.noOfStudents) || 0, // Parse as integer with a default value of 0
    }));
    
    return scatterData;
  }

interface Subject {
  students: number;
  unit_code: string;
  unit_name: string;
  credit_points: number;
  delivery_mode: string;
}

interface Lecture {
  f2f: string;
  instance: number;
  students: number;
  credit_points: number;
  hour_per_instance: number;
}

interface Unit {
  lectures: Lecture[];
  subjects: Subject[];
  unit_code: string;
}

interface UserData {
  meta: {
    units: Unit[];
  };
}

export const workloadByDeliveryMode = (userDataArray: UserData[]): any[] => {
  const chartData: any[] = [];

  userDataArray.forEach((userData) => {
    userData?.meta?.units.forEach((unit) => {
      let unitCode: string | null = null;
      if (unit.unit_code === "s1") {
        unitCode = "Semester 1";
      } else if (unit.unit_code === "s2") {
        unitCode = "Semester 2";
      } else if (unit.unit_code === "ws") {
        unitCode = "Winter Semester";
      } else if (unit.unit_code === "ss") {
        unitCode = "Summer Semester";
      } else {
        unitCode = unit.unit_code;
      }

      const deliveryModeCounts: { [key: string]: number } = {};

      unit?.subjects?.forEach((subject) => {
        const deliveryMode = subject.delivery_mode;
        const students = subject.students;

        if (!deliveryModeCounts[deliveryMode]) {
          deliveryModeCounts[deliveryMode] = 0;
        }

        deliveryModeCounts[deliveryMode] += students;
      });

      const existingEntryIndex = chartData.findIndex(
        (entry) => entry.unit_code === unitCode
      );

      if (existingEntryIndex !== -1) {
        Object.keys(deliveryModeCounts).forEach((mode) => {
          chartData[existingEntryIndex][mode] =
            (chartData[existingEntryIndex][mode] || 0) +
            deliveryModeCounts[mode];
        });
      } else {
        const unitChartData: any = {
          unit_code: unitCode,
          ...deliveryModeCounts,
        };
        chartData.push(unitChartData);
      }
    });
  });

  return chartData;
};

// Function to convert rawData into data suitable for the Pie Chart
export const convertDataForPieChart = (rawData: any) => {
  // Extract the units array from rawData
  const units = rawData?.meta?.units || [];

  // Initialize an empty object to store the total students for each delivery mode
  const deliveryModeCounts: any = {};

  // Loop through the units and calculate the total students for each delivery mode
  for (const unit of units) {
    const subjects = unit.subjects || [];

    for (const subject of subjects) {
      const deliveryMode = modeLabelMap[subject.delivery_mode || "Unknown"];
      const students = subject.students || 0;

      // Add the students to the corresponding delivery mode
      if (!deliveryModeCounts[deliveryMode]) {
        deliveryModeCounts[deliveryMode] = students;
      } else {
        deliveryModeCounts[deliveryMode] += students;
      }
    }
  }

  // Convert the deliveryModeCounts object into an array of objects
  const dataForPieChart = Object.entries(deliveryModeCounts).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return dataForPieChart;
};
