import { NextApiRequest, NextApiResponse } from "next";
import { withMiddleware } from "../../../../components/server/middleware/authMiddleware";
import prisma from "../../../../components/server/lib/prisma";

const getHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const config = await prisma.config.findMany();
    res.status(200).json({ message: "success", count: config.length, config: config });
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
