import { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestWithUser } from "../../../../components/server/types/interface";
import prisma from "../../../../components/server/lib/prisma";

const getHandler = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const findRole = await prisma.role.findMany({
        where: {
            isVisible: true
        }
    });

    res.status(200).json({ message: "success", roles: findRole });
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
export default handler;
