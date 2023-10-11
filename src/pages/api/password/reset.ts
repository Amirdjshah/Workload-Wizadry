import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../components/server/lib/prisma";
import bcrypt from "bcrypt";
import * as yup from "yup";

const resetSchema = yup.object().shape({
  token: yup.string().required(),
  password: yup.string().required().min(8),
});

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token, password } = await resetSchema.validate(req.body);

    // Find the user by the reset token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gte: new Date(), // Check if the reset token is still valid
        },
      },
    });

    if (!user) {
      // Invalid reset token or token expired
      return res
        .status(401)
        .json({ message: "Invalid or expired reset token" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset token
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetToken: null, // Clear the reset token
        resetTokenExpiry: null, // Clear the token expiration timestamp
      },
    });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.log("ERR", err);
    res.status(400).json(err);
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
