import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";

const prisma = new PrismaClient();

export const createImpactStat = async (req: Request, res: Response) => {
    try {
        const { number, label } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Image file is required." });
        }

        const filePath = req.file.path;

        const result = await uploadToCloudinary(filePath, "impact-stats");

        const newStat = await prisma.impactStat.create({
            data: {
                number,
                label,
                imageUrl: result.secure_url,
            },
        });

        return res.status(201).json({ message: "Impact data added", data: newStat });
    } catch (error) {
        console.error("Error creating impact stat:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateImpactStat = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { number, label } = req.body;

        // Find existing record
        const existingStat = await prisma.impactStat.findUnique({
            where: { id: Number(id) },
        });

        if (!existingStat) {
            return res.status(404).json({ error: "ImpactStat not found" });
        }

        let updatedImageUrl = existingStat.imageUrl;

        // If new image is uploaded, update Cloudinary and get new URL
        if (req.file) {
            const filePath = req.file.path;
            const cloudinaryResult = await uploadToCloudinary(filePath, "impact-stats");
            updatedImageUrl = cloudinaryResult.secure_url;
        }

        const updatedStat = await prisma.impactStat.update({
            where: { id: Number(id) },
            data: {
                number,
                label,
                imageUrl: updatedImageUrl,
            },
        });

        return res.status(200).json({ message: "ImpactStat updated", data: updatedStat });
    } catch (error) {
        console.error("Error updating impact stat:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getAllImpactStats = async (req: Request, res: Response) => {
    try {
        const stats = await prisma.impactStat.findMany({
            orderBy: {
                id: 'asc', // Optional: Sort by ID ascending
            },
        });

        return res.status(200).json({ data: stats });
    } catch (error) {
        console.error("Error fetching impact stats:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const deleteImpactStat = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const stat = await prisma.impactStat.findUnique({
            where: { id: Number(id) },
        });

        if (!stat) {
            return res.status(404).json({ error: "ImpactStat not found" });
        }

        // Optional: extract public ID from Cloudinary image URL and delete from Cloudinary
        // Example assumes imageUrl has structure like: https://res.cloudinary.com/your-cloud/image/upload/v.../folder/filename.jpg
        // const imageUrl = stat.imageUrl;
        // const segments = imageUrl.split('/');
        // const publicIdWithExtension = segments.slice(-2).join('/').split('.')[0]; // folder/filename (without extension)

        // try {
        //     await cloudinary.uploader.destroy(publicIdWithExtension, {
        //         resource_type: 'image',
        //     });
        // } catch (cloudErr) {
        //     console.warn("Cloudinary deletion failed or skipped:", cloudErr);
        // }

        // Delete from DB
        await prisma.impactStat.delete({
            where: { id: Number(id) },
        });

        return res.status(200).json({ message: "ImpactStat deleted successfully" });
    } catch (error) {
        console.error("Error deleting impact stat:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
