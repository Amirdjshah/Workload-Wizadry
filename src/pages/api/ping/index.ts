import { NextApiRequest, NextApiResponse } from "next";

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200).json({ message: "success", data: "Backend is alive!!" });
  } catch (err: any) {
    console.log("ERR", err);
    res.json(err);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return await getHandler(req, res);
  }
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
}
