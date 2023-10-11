import { NextApiRequest } from "next";

export interface NextApiRequestWithUser extends NextApiRequest {
    user?: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      isVerified: boolean;
      role: {
        id: number;
        roleCode: string;
        roleName: string;
        description: string;
      },
      faculty: {
        id: number;
      }
    };
  }