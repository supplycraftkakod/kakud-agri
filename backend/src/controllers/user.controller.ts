import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middlewares/auth.middleware";

const prisma = new PrismaClient();

// GET current user's details
export const getUserDetails = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        imgUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE current user's details
export const updateUserDetails = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { name, phone, imgUrl } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phone,
        imgUrl,
      },
    });

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "User not found" });
    }
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
