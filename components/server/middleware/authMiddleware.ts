import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { parse } from "cookie";
import prisma from "../lib/prisma";
import { NextApiRequestWithUser } from "../types/interface";

// Define your authentication middleware here (e.g., authMiddleware)
const authMiddleware = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse,
  next: () => void
) => {
  try {
    // Parse cookies from the request
    const cookies = parse(req.headers.cookie || "");

    // Check if the user is authenticated (has a valid JWT)
    const token = cookies["token"]; // Replace with your JWT cookie name
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the JWT token
    const secretKey = process.env.SECRET_KEY || "secret";
    const decoded: any = verify(token, secretKey);

    // Check if the user exists in the database
    const user: any = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        isVerified: true,
        role: true,
        faculty: true,
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;

    // Continue to the next middleware or API handler
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Custom higher-order function to apply middleware to API routes
export function withMiddleware(
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await authMiddleware(req, res, async () => {
      await handler(req, res);
    });
  };
}
