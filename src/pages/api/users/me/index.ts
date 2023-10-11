import { NextApiRequest, NextApiResponse } from "next";
import { withMiddleware } from "../../../../../components/server/middleware/authMiddleware";
import { NextApiRequestWithUser } from "../../../../../components/server/types/interface";
import prisma from "../../../../../components/server/lib/prisma";

const getHandler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const userData = {
      ...req.user,
    };
    res.status(200).json({ message: "success", user: userData });
  } catch (err) {
    res.json(err);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return await getHandler(req, res);
  }
  res.status(405).json({ message: "Method not allowed" });
  return;
};

// Apply the middleware to the API route
export default withMiddleware(handler);
