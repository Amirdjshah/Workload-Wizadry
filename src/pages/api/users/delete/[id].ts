import { NextApiResponse } from "next";
import { NextApiRequestWithUser } from "../../../../../components/server/types/interface";
import prisma from "../../../../../components/server/lib/prisma";
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
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        isApproved: false,
      },
    });
    res.status(200).json({ message: "User deactivated successfully" });
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
