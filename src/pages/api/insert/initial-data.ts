import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../components/server/lib/prisma";
import { Prisma } from "@prisma/client";

const feedRole = async () => {
  const data: Prisma.RoleCreateManyInput[] = [
    {
      id: 1,
      roleName: "Faculty Manager",
      description: "Faculty Manager is the top role",
      isVisible: true,
      roleCode: "FL",
    },
    {
      id: 2,
      roleName: "Capability Leader",
      description: "Can Manage academics - second level role",
      isVisible: true,
      roleCode: "CL",
    },
    {
      id: 3,
      roleName: "Academic",
      description: "Can Manage workload - last level role",
      isVisible: true,
      roleCode: "AD",
    },
    {
      id: 4,
      roleName: "Super Admin",
      description: "Can Manage Everything",
      isVisible: false,
      roleCode: "SA",
    },
  ];
  try {
    const response = await prisma.role.createMany({
      data: data,
      skipDuplicates: true,
    });
  } catch (err) {
    console.log(err);
  }
  const returnResponse = await prisma.role.findMany();
  return returnResponse;
};

const feedAppointmentType = async () => {
  try {
    const data: Prisma.AppointmentTypeCreateManyInput[] = [
      {
        short_name: "EF",
        long_name: "Education focused",
      },
      {
        short_name: "RF",
        long_name: "Research focused",
      },
      {
        short_name: "ER",
        long_name: "Education research",
      },
    ];

    const response = await prisma.appointmentType.createMany({
      data: data,
    });
  } catch (err) {}
  const returnResponse = await prisma.appointmentType.findMany();
  return returnResponse;
};

const feedAppointment = async () => {};

const feedConfig = async () => {
  try {
    const data: Prisma.ConfigCreateManyInput[] = [
      {
        description: "Teaching-related hours per F2F hour credit",
        key: "teachingRelated",
        value: "1.5",
      },
      {
        description: "F2F hour credit per unit, standard",
        key: "f2fHourCredit",
        value: "4",
        meta: {
          perStudent: "30",
        },
      },
      {
        description: "F2F hour credit cotaught loading",
        key: "f2fHourCreditCotaught",
        value: "0.1",
        meta: {
          greaterThan: "10",
        },
      },
      {
        description: "F2F hour credit multi-modal unit",
        key: "f2fHourCreditMultiModal",
        value: "0.1",
      },
      {
        description: "F2F hour credit new unit",
        key: "f2fHourCreditNewUnit",
        value: "56",
      },
      {
        description: "F2F hour credit significant revision",
        key: "f2fHourCreditSignificantRevision",
        value: "4",
      },
      {
        description: "F2F hour credit newly recorded video",
        key: "f2fHourCreditNewlyRecordedVideo",
        value: "12",
      },
      {
        description: "F2F hour credit moderation",
        key: "f2fHourCreditModeration",
        value: "4",
      },
      {
        description: "F2F hour credit moderation of large unit",
        key: "f2fHourCreditModerationLargeUnit",
        value: "0.5",
        meta: {
          per: "50",
          above: "150",
        },
      },
      {
        description: "F2F hour credit team teaching",
        key: "f2fHourCreditTeamTeaching",
        value: "3",
      },
      {
        description: "F2F hour credit large lab class loading",
        key: "f2fHourCreditLargeLabClassLoading",
        value: "0.2",
        meta: {
          greaterThan: "80",
        },
      },
      {
        description: "F2F hour credit new teacher in existing unit",
        key: "f2fHourCreditNewTeacherInExistingUnit",
        value: "0.1",
      },
      {
        description: "F2F hour credit new staff",
        key: "f2fHourCreditNewStaff",
        value: "35",
      },
      {
        description: "F2F hour credit assistant professor critical",
        key: "f2fHourCreditAssistantProfessorCritical",
        value: "72",
      },
      {
        description: "F2F hour credit honours supervision",
        key: "f2fHourCreditHonoursSupervision",
        value: "24",
      },
      {
        description: "F2F hour credit capstone/research proj",
        key: "f2fHourCreditCapstoneResearchProj",
        value: "6",
        meta: {
          per: "3",
        },
      },
      {
        description: "F2F hour credit TSI",
        key: "f2fHourCreditTSI",
        value: "65",
        meta: {
          for: "EF",
        },
      },
      {
        description: "Teaching-related hour credit Marking",
        key: "teachingRelatedHourCreditMarking",
        value: "1",
        meta: {
          per: "3",
        },
      },
      {
        description: "Research Primary supervision",
        key: "researchPrimarySupervision",
        value: "50",
      },
    ];

    const response = await prisma.config.createMany({
      data: data,
    });
  } catch (err) {}
  const returnResponse = await prisma.config.findMany();
  return returnResponse;
};

const feedFaculty = async () => {
  const facultyName = "Faculty of Science and Technology";
  const findFacultyByName: any = await prisma.faculty.findFirst({
    where: {
      name: facultyName,
    },
  });
  if (findFacultyByName) {
    return findFacultyByName;
  }
  const facultyInsert = await prisma.faculty.create({
    data: {
      name: "Faculty of Science and Technology",
    },
  });
  return facultyInsert;
};

const feedDiscipline = async (facultyData: any) => {
  try {
    const disciplineInsert = await prisma.discipline.createMany({
      data: [
        {
          name: "Academic Program Area - Science",
          facultyId: facultyData.id,
          unit_offering: 26,
          scheduling_required: 1,
          ready_for_publishing: 25,
        },
        {
          name: "Academic Program Area - Technology",
          facultyId: facultyData.id,
          unit_offering: 108,
          scheduling_required: 8,
          ready_for_publishing: 100,
        },
        {
          name: "Faculty of Science and Technology",
          facultyId: facultyData.id,
          unit_offering: 1,
          scheduling_required: 1,
          ready_for_publishing: 0,
        },
      ],
    });
  } catch (err) {}
  const returnResponse = await prisma.discipline.findMany();
  return returnResponse;
};

const feedUnit = async (discipline: any) => {
  try {
    const data = require(`../../../../components/server/initialData/faculty.json`);
    if (!data || !data.length) {
      return "Data is empty";
      // return res.status(400).json({ message: "Data is empty" });
    }
    const newData = data.map((item: any) => {
      return {
        ...item,
        disciplineId: discipline?.[0]?.id,
      };
    });
    const insertData = await prisma.unit.createMany({
      data: newData,
      skipDuplicates: true,
    });
    return insertData.count;
  } catch (err) {}
  return await prisma.unit.count();
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { feed } = req.body;

    if (!feed) {
      return res.status(400).json({ message: "Feed is required" });
    }

    const response: any = {};

    const rolesData = await feedRole()
    response["roles"] = rolesData;

    const appointmentTypes = await feedAppointmentType();
    response["appointmentTypes"] = appointmentTypes;

    const facultyData = await feedFaculty();
    response["faculty"] = facultyData;

    const disciplineData = await feedDiscipline(facultyData);
    response["discipline"] = disciplineData;

    const unitData = await feedUnit(disciplineData);
    response["unitCount"] = unitData;

    const configData = await feedConfig();
    response["config"] = configData;

    res.status(201).json({
      message: "Success",
      data: response,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return await postHandler(req, res);
  }
  res.status(405).json({ message: "Method not allowed" });
  return;
}
