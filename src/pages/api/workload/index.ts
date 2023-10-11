import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../components/server/lib/prisma";
import * as yup from "yup";
import { withMiddleware } from "../../../../components/server/middleware/authMiddleware";
import { NextApiRequestWithUser } from "../../../../components/server/types/interface";
import { sendEmailToCapabilityLeader } from "../../../../components/server/utils/email";

const workloadSchema = yup.object().shape({
  id: yup.number(),
  user_id: yup.number().required(),
  status: yup
    .string()
    .oneOf(["DRAFT", "PENDING", "APPROVED", "REJECTED"])
    .required(),
  meta: yup.object().required(),
});

const postHandler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const { user_id, status, meta } = await workloadSchema.validate(req.body);

    const checkIfAlreadyExistAndStatusInPending =
      await prisma.workload.findFirst({
        where: {
          user_id,
          //   status in draft or pending
          status: {
            in: ["DRAFT", "PENDING"],
          },
        },
      });

    let workload = null;
    if (checkIfAlreadyExistAndStatusInPending) {
      workload = await prisma.workload.update({
        where: {
          id: checkIfAlreadyExistAndStatusInPending.id,
        },
        data: {
          status,
          meta,
        },
      });
    } else {
      workload = await prisma.workload.create({
        data: {
          user_id,
          status,
          meta,
        },
      });
    }

    // if status === "pending" then send email to Capability leader
    if (status === "PENDING") {
      const getCapabilityLeaderRoleId = await prisma.role.findFirst({
        where: {
          roleCode: "CL",
        },
        select: {
          id: true,
        },
      });
      // get all capability leader
      const capabilityLeaders = await prisma.user.findMany({
        where: {
          faculty_id: req.user?.faculty.id,
          role_id: getCapabilityLeaderRoleId?.id,
          isApproved: true,
          isVerified: true,
        },
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      });

      const emails = capabilityLeaders.map((cl) => cl.email);

      const protocol = req.headers["x-forwarded-proto"] || "http";
      const host = req.headers.host;
      const baseUrl = `${protocol}://${host}`;

      sendEmailToCapabilityLeader(workload?.id, emails, req.user, baseUrl);
    }

    res
      .status(200)
      .json({ message: "Workload created successfully", workload });
  } catch (err) {
    console.log("ERR", err);
    res.status(400).json(err);
  }
};

const getHandler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    // check usr role
    const role = req?.user?.role?.roleCode;
    let workload = null;
    if (role === "CL" || role === "FL") {
      workload = await prisma.workload.findMany({
        where: {
          status: {
            in: ["PENDING", "APPROVED", "REJECTED"],
          },
          user: {
            faculty_id: req?.user?.faculty?.id,
          },
        },
        include: {
          user: true,
        },
      });
    } else {
      workload = await prisma.workload.findMany({
        where: {
          user_id: (req.user?.id as any) || -1,
        },
      });
    }
    res
      .status(200)
      .json({ message: "Workload updated successfully", workload });
  } catch (err) {
    res.status(400).json(err);
  }
};

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  if (req.method === "POST") {
    return await postHandler(req, res);
  }
  if (req.method === "GET") {
    return await getHandler(req, res);
  }
  res.status(405).json({ message: "Method not allowed" });
  return;
};

export default withMiddleware(handler);
// export default handler;
