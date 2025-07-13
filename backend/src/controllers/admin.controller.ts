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

// Delete Product
export const deleteProductById = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  if (isNaN(productId)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete the product (cascade deletes will handle children)
    await prisma.product.delete({
      where: { id: productId },
    });

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// 1. Get cumulative views of all products
export const getTotalProductViews = async (_req: Request, res: Response) => {
  try {
    const totalViews = await prisma.product.aggregate({
      _sum: {
        views: true,
      },
    });

    res.json({ totalViews: totalViews._sum.views || 0 });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get total product views' });
  }
};

// 2. Get total number of products
export const getTotalProductCount = async (_req: Request, res: Response) => {
  try {
    const count = await prisma.product.count();
    res.json({ totalProducts: count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get product count' });
  }
};

// 3. Get products added by month
export const getProductsGroupedByMonth = async (_req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        createdAt: true,
      },
    });

    const grouped: { [key: string]: number } = {};

    products.forEach((product) => {
      const key = `${product.createdAt.getFullYear()}-${String(product.createdAt.getMonth() + 1).padStart(2, '0')}`;
      grouped[key] = (grouped[key] || 0) + 1;
    });
    
    res.json({ productsByMonth: grouped });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get monthly product grouping' });
  }
};

// 4. Get most viewed products (top 5 by default)
export const getMostViewedProducts = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 5;

  try {
    const products = await prisma.product.findMany({
      orderBy: {
        views: 'desc',
      },
      take: limit,
      select: {
        id: true,
        name: true,
        views: true,
        imageUrl: true,
        createdAt: true,
      },
    });

    res.json({ mostViewed: products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get most viewed products' });
  }
};