import { Request, Response } from 'express';
import prisma from '../prisma';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';

// Upload multiple banners
export const uploadBanners = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const bannerPromises = files.map(async (file) => {
      const cloudResult = await uploadToCloudinary(file.path, "banners");

      return prisma.banner.create({
        data: {
          imageUrl: cloudResult.secure_url,
          shouldVisible: true,
        },
      });
    });

    const createdBanners = await Promise.all(bannerPromises);

    res.status(201).json({
      message: "Banners uploaded",
      banners: createdBanners,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload banners", error });
  }
};

// Toggle visibility
export const toggleVisibility = async (req: Request, res: Response) => {
  const bannerId = parseInt(req.params.id);
  const { visible } = req.body;

  try {
    const updated = await prisma.banner.update({
      where: { id: bannerId },
      data: { shouldVisible: visible },
    });

    res.json({ message: "Banner visibility updated", banner: updated });
  } catch (error) {
    console.error("Toggle error:", error);
    res.status(404).json({ message: "Banner not found", error });
  }
};

// Get visible banners for frontend hero section
export const getAllBanners = async (req: Request, res: Response) => {
  try {
    const banners = await prisma.banner.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({ banners });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch visible banners", error });
  }
};

// Get visible banners for frontend hero section
export const getVisibleBanners = async (req: Request, res: Response) => {
  try {
    const banners = await prisma.banner.findMany({
      where: { shouldVisible: true },
      orderBy: { createdAt: "desc" }, // optional: latest first
    });

    res.json({ banners });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch visible banners", error });
  }
};

// Delete banner
export const deleteBanner = async (req: Request, res: Response) => {
  const bannerId = parseInt(req.params.id);

  try {
    await prisma.banner.delete({ where: { id: bannerId } });
    res.json({ message: "Banner deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(404).json({ message: "Banner not found", error });
  }
};
