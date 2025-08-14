import { Request, Response } from "express";
import prisma from "../prisma";

export const getAllJobRoles = async (req: Request, res: Response) => {
    try {
        const roles = await prisma.jobRole.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(roles);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch roles." });
    }
};


export const addJobRole = async (req: Request, res: Response) => {
    const { role, location, department } = req.body;

    if (!role || !location || !department) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newRole = await prisma.jobRole.create({
            data: { role, location, department },
        });
        res.status(201).json(newRole);
    } catch (err) {
        res.status(500).json({ message: "Failed to create job role." });
    }
};

export const deleteJobRole = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.jobRole.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Job role deleted successfully." });
    } catch (err) {
        res.status(404).json({ message: "Job role not found." });
    }
};
