// pages/api/logout.ts

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );

    res.status(200).json({ message: "Logout successful" });
  } else {
    res.status(405).end();
  }
};
