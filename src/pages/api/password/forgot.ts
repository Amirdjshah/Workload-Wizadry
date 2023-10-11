import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../../../components/server/lib/prisma";
import bcrypt from "bcrypt";
import * as yup from "yup";
import { generateUniqueVerificationCode } from "../../../../components/server/utils/common";
import { forgotPasswordEmail } from "../../../../components/server/utils/email";

const forgotSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = await forgotSchema.validate(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Email is not valid, please check your email and try again.",
      });
    }

    // Generate a unique token for the password reset link
    const resetToken = generateUniqueVerificationCode();

    // Update the user's record with the reset token and a timestamp
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 3600000),
      },
    });

    // send email
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host
    const baseUrl = `${protocol}://${host}`;
    const emailSent = await forgotPasswordEmail(
      email,
      `${user.firstName} ${user.lastName}`,
      resetToken,
      baseUrl
    );

    if (!emailSent) {
      return res
        .status(500)
        .json({ message: "Failed to send verification email" });
    }

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (err) {
    console.log("ERR", err);
    res.status(400).json(err);
    // res.status(400).json({ message: "success", data: err });
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
