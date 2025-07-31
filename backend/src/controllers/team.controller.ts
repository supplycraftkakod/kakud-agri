import { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import prisma from "../prisma";

export const addTeamMember = async (req: Request, res: Response) => {
    try {
        const { name, role, about } = req.body;
        const file = req.file;

        if (!name || !role || !about || !file) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Upload to cloudinary
        const uploadResult = await uploadToCloudinary(file.path, "team_members");

        // Parse 'about' - assuming it's sent as JSON string
        const aboutArray: string[] = JSON.parse(about);

        // Create team member with related about lines
        const newMember = await prisma.teamMember.create({
            data: {
                name,
                role,
                image: uploadResult.secure_url,
                about: {
                    create: aboutArray.map((line) => ({
                        content: line
                    }))
                }
            },
            include: {
                about: true
            }
        });

        res.status(201).json(newMember);
    } catch (error) {
        console.error("Error adding team member:", error);
        res.status(500).json({ error: "Failed to add team member" });
    }
};

export const getAllTeamMembers = async (_req: Request, res: Response) => {
    try {
        const members = await prisma.teamMember.findMany({
            include: {
                about: true,
            },
            orderBy: {
                id: 'asc', // Optional: to ensure consistent order
            },
        });

        res.status(200).json({ team: members });
    } catch (error) {
        console.error("Error fetching team members:", error);
        res.status(500).json({ error: "Failed to fetch team members" });
    }
};

export const updateTeamMember = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, role, about } = req.body;
    const file = req.file;

    if (isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid ID parameter" });
    }

    try {
        const existingMember = await prisma.teamMember.findUnique({
            where: { id: Number(id) },
            include: { about: true },
        });

        if (!existingMember) {
            return res.status(404).json({ error: "Team member not found" });
        }

        let imageUrl = existingMember.image;

        // If new image uploaded, upload to cloudinary
        if (file) {
            const uploadResult = await uploadToCloudinary(file.path, "team_members");
            imageUrl = uploadResult.secure_url;
        }

        // Update team member
        const updatedMember = await prisma.teamMember.update({
            where: { id: Number(id) },
            data: {
                name: name || existingMember.name,
                role: role || existingMember.role,
                image: imageUrl,
            },
        });

        // Update about lines (replace old with new)
        if (about) {
            const aboutArray: string[] = JSON.parse(about);

            // Delete old about lines
            await prisma.aboutLine.deleteMany({
                where: { teamMemberId: updatedMember.id },
            });

            // Create new ones
            await prisma.aboutLine.createMany({
                data: aboutArray.map((line) => ({
                    content: line,
                    teamMemberId: updatedMember.id,
                })),
            });
        }

        // Return updated data
        const memberWithAbout = await prisma.teamMember.findUnique({
            where: { id: updatedMember.id },
            include: { about: true },
        });

        res.status(200).json({ member: memberWithAbout });
    } catch (error) {
        console.error("Error updating team member:", error);
        res.status(500).json({ error: "Failed to update team member" });
    }
};

export const deleteTeamMember = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid ID parameter" });
    }

    try {
        const member = await prisma.teamMember.findUnique({
            where: { id: Number(id) },
        });

        if (!member) {
            return res.status(404).json({ error: "Team member not found" });
        }

        // // Optional: extract public_id and delete image from Cloudinary
        // const publicIdMatch = member.image.match(/\/team_members\/([^\.\/]+)/);
        // if (publicIdMatch && publicIdMatch[1]) {
        //     const publicId = `team_members/${publicIdMatch[1]}`;
        //     await cloudinary.uploader.destroy(publicId);
        // }

        // Delete team member (about lines will be deleted via cascade)
        await prisma.teamMember.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({ message: "Team member deleted successfully" });
    } catch (error) {
        console.error("Error deleting team member:", error);
        res.status(500).json({ error: "Failed to delete team member" });
    }
};