import { Request, Response } from 'express';
import prisma from '../prisma';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';

// Controller to add a product
export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      category,
      description,
      about,
      benefits,
      activeIngredients,
      formulationTypes,
      crops,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Upload image if file provided
    const result = await uploadToCloudinary(req.file.path, 'kakud_products');
    const imageUrl = result.secure_url;

    const product = await prisma.product.create({
      data: {
        name,
        category,
        description,
        imageUrl: imageUrl,
        lastUpdated: new Date(),
        about: {
          create: JSON.parse(about).map((content: string) => ({ content })),
        },
        benefits: {
          create: JSON.parse(benefits).map((content: string) => ({ content })),
        },
        activeIngredients: {
          create: JSON.parse(activeIngredients).map((content: string) => ({ content })),
        },
        formulationTypes: {
          create: JSON.parse(formulationTypes).map((content: string) => ({ content })),
        },
        crops: {
          create: JSON.parse(crops).map((content: string) => ({ content })),
        },
      },
    });

    return res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  const {
    name,
    category,
    description,
    imageUrl,
    aboutPoints,
    benefitPoints,
    activeIngredients,
    formulationTypes,
    crops,
  } = req.body;

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Update product base fields
    await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        category,
        description,
        imageUrl,
        lastUpdated: new Date(),
      },
    });

    // Delete old relations
    await prisma.aboutPoint.deleteMany({ where: { productId } });
    await prisma.benefitPoint.deleteMany({ where: { productId } });
    await prisma.activeIngredient.deleteMany({ where: { productId } });
    await prisma.formulationType.deleteMany({ where: { productId } });
    await prisma.crop.deleteMany({ where: { cropId: productId } });

    // Re-insert updated related arrays
    if (Array.isArray(aboutPoints)) {
      await prisma.aboutPoint.createMany({
        data: aboutPoints.map(content => ({ content, productId })),
      });
    }

    if (Array.isArray(benefitPoints)) {
      await prisma.benefitPoint.createMany({
        data: benefitPoints.map(content => ({ content, productId })),
      });
    }

    if (Array.isArray(activeIngredients)) {
      await prisma.activeIngredient.createMany({
        data: activeIngredients.map(content => ({ content, productId })),
      });
    }

    if (Array.isArray(formulationTypes)) {
      await prisma.formulationType.createMany({
        data: formulationTypes.map(content => ({ content, productId })),
      });
    }

    if (Array.isArray(crops)) {
      await prisma.crop.createMany({
        data: crops.map(content => ({ content, cropId: productId })),
        skipDuplicates: true, // avoids error if crop already exists
      });
    }

    res.status(200).json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ success: false, message: "Server error during update" });
  }
};