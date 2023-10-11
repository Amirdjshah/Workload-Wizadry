import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "../../../../components/server/lib/prisma";
import bcrypt from "bcrypt";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const secretKey = process.env.SECRET_KEY || "secret";
  try {
    const { email, password } = await loginSchema.validate(req.body);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials, please check your email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message:
          "Email is not verified. Please check your email for verification instructions.",
      });
    }
    if (!user.isApproved) {
      return res.status(401).json({
        message:
          "Your account is not approved. Please contact the administrator.",
      });
    }

    // Compare the hashed password with the user's input
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials, please check your email or password",
      });
    }

    // Create a JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        roleId: user?.role?.id,
        roleCode: user?.role?.roleCode,
      },
      secretKey
    );

    // Set the JWT token as a cookie
    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=None; Secure`
    );

    res
      .status(200)
      .json({
        message: "Logged in successfully",
        token: token,
        role_code: user?.role?.roleCode,
      });
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
