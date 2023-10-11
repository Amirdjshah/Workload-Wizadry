import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../components/server/lib/prisma";
import * as yup from "yup";

const verificationSchema = yup.object().shape({
  verificationCode: yup.string().required("Verification code is required"),
});

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { verificationCode } = await verificationSchema.validate(req.body);
    // Find the user with the provided verification code
    const user = await prisma.user.findFirst({
      where: {
        verificationCode,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid verification code" });
    }

    // Check if the user's email is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    // Update the user's isVerified field to true
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        verificationCode: null,
      },
    });

    res.status(200).json({ message: "Email verification successful" });
  } catch (err) {
    console.error("Email verification error:", err);
    res.json(err);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return await postHandler(req, res);
  }
  res.status(405).json({ message: "Method not allowed" });
  return;
}
