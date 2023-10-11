import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../components/server/lib/prisma";
import { signUpRequestApprove } from "../../../../../components/server/utils/email";
import { NextApiRequestWithUser } from "../../../../../components/server/types/interface";
import { withMiddleware } from "../../../../../components/server/middleware/authMiddleware";

const postHandler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const role = req?.user?.role?.roleCode;
    if (role !== "SA") {
      res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
      return;
    }
    const id = Number(req.query.id);
    const findUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!findUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        isApproved: true,
      },
    });

    const emailSent = await signUpRequestApprove(findUser.email, {
      firstName: findUser.firstName,
      lastName: findUser.lastName,
    });

    res.status(200).json({
      message: "Successfully approved!",
      data: null,
    });
  } catch (err) {
    console.log("ERR", err);
    res.status(400).json(err);
    // res.status(400).json({ message: "success", data: err });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return await postHandler(req, res);
  }
  res.status(405).json({ message: "Method not allowed" });
  return;
};

export default withMiddleware(handler);
