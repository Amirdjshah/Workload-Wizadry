import { NextApiResponse, NextApiRequest } from "next";
import { NextApiRequestWithUser } from "../../../../../components/server/types/interface";
import prisma from "../../../../../components/server/lib/prisma";
import { withMiddleware } from "../../../../../components/server/middleware/authMiddleware";
import * as yup from "yup";
import { sendEmailToCapabilityLeader } from "../../../../../components/server/utils/email";

const getHandler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const workload = await prisma.workload.findFirst({
      where: {
        id: Number(req.query.id)
      },
    });
    if(!workload){
        return res.status(403).json({message: "Permission denied"})
    }
    res.status(200).json({ message: "Workload get successfully", workload });
  } catch (err) {
    res.status(400).json(err);
  }
};

const workloadSchema = yup.object().shape({
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
    const id = Number(req.query.id);
    const { status, meta } = await workloadSchema.validate(req.body);

    const workload = await prisma.workload.update({
      where: {
        id,
      },
      data: {
        status,
        meta,
      },
    });
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
        },
      });

      console.log("leaders", capabilityLeaders);

      const protocol = req.headers["x-forwarded-proto"] || "http";
      const host = req.headers.host;
      const baseUrl = `${protocol}://${host}`;

      const emails = capabilityLeaders.map((cl) => cl.email);

      sendEmailToCapabilityLeader(
        workload?.id,
        emails,
        req.user,
        baseUrl
      );
    }
    res
      .status(200)
      .json({ message: "Workload updated successfully", workload });
  } catch (err) {
    console.log("ERR", err);
    res.status(400).json(err);
  }
};
const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = Number(req.query.id);
    const workload = await prisma.workload.delete({
      where: {
        id,
      },
    });
    res
      .status(200)
      .json({ message: "Workload deleted successfully", workload });
  } catch (err) {
    console.log("ERR", err);
    res.status(400).json(err);
  }
};

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  if (req.method === "GET") {
    return await getHandler(req, res);
  }
  if (req.method === "POST") {
    return await postHandler(req, res);
  }
  if (req.method === "DELETE") {
    return await deleteHandler(req, res);
  }
  res.status(405).json({ message: "Method not allowed" });
  return;
};

export default withMiddleware(handler);
