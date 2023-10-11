import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../components/server/lib/prisma";
import bcrypt from "bcrypt";
import { generateUniqueVerificationCode } from "../../../../components/server/utils/common";
import {
  signupVerificationEmail,
  userSignupRequest,
} from "../../../../components/server/utils/email";
import * as yup from "yup";

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  role_id: yup.number().required(),
  faculty_id: yup.number().required(),
});

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password, firstName, lastName, role_id, faculty_id } =
      await signupSchema.validate(req.body);

    // Check if the email is already taken
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email is already register. Please login to continue.",
      });
    }

    // Generate a unique verification code (you can use a library for this)
    const verificationCode = generateUniqueVerificationCode();

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Create a new user with the hashed password
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        verificationCode,
        role_id,
        faculty_id,
      },
    });

    // send email
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    const emailSent = await signupVerificationEmail(
      email,
      `${firstName} ${lastName}`,
      verificationCode,
      baseUrl
    );

    const findAdminEmail = await prisma.user.findMany({
      where: {
        role: {
          roleCode: "SA",
        },
      },
      select: {
        email: true,
      },
    });

    const adminEmails = findAdminEmail.map((item) => item.email);

    const adminEmailSend = await userSignupRequest(adminEmails, baseUrl);

    if (!emailSent) {
      return res
        .status(500)
        .json({ message: "Failed to send verification email" });
    }

    res.status(201).json({
      message:
        "User registered successfully, please check your email for account activation.",
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
