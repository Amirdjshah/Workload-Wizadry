import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../../components/server/lib/prisma";
import * as yup from "yup";
import { withMiddleware } from "../../../../../../components/server/middleware/authMiddleware";
import { NextApiRequestWithUser } from "../../../../../../components/server/types/interface";
import { workloadRejectEmail } from "../../../../../../components/server/utils/email";

const workloadSchema = yup.object().shape({
  reason: yup.string().required(),
});

const postHandler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const { reason } = await workloadSchema.validate(req.body);
    const id: any = Number(req.query.id);
    const role = req?.user?.role?.roleCode;
    if (role !== "CL") {
      res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
      return;
    }

    const workload = await prisma.workload.update({
      where: {
        id,
        status: {
          in: ["DRAFT", "PENDING"],
        },
      },
      data: {
        reason,
        status: "REJECTED",
      },
      select: {
        user: true,
      },
    });

    // send email
    const emailSent = await workloadRejectEmail(
      workload?.user?.email,
      {
        firstName: workload?.user?.firstName,
        lastName: workload?.user?.lastName,
      },
      reason
    );

    res
      .status(200)
      .json({ message: "Workload rejected successfully", workload });
  } catch (err) {
    console.log("ERR", err);
    res.status(400).json(err);
  }
};

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  if (req.method === "POST") {
    return await postHandler(req, res);
  }
  res.status(405).json({ message: "Method not allowed" });
  return;
};

export default withMiddleware(handler);
