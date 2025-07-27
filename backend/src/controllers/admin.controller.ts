import { Request, Response } from 'express';
import prisma from '../prisma';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';
import { Prisma } from '@prisma/client';

// ---------------------------------------------------------------Product--------------------------------------------------

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

export const getAnalytics = async (_req: Request, res: Response) => {
  try {
    const totalProducts = await prisma.product.count();
    const totalBlogs = await prisma.blog.count();
    const totalEvents = await prisma.event.count();
    res.json({ totalProducts, totalBlogs, totalEvents });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get product count' });
  }
}

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

// ---------------------------------------------------------------Blog--------------------------------------------------

interface BlockPayload {
  type: 'bigHeading' | 'subHeading' | 'paragraph' | 'image';
  value?: string; // For text blocks
  fileIndex?: number; // For image blocks (matched from req.files)
}

// Create Blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const filesMap = new Map<string, Express.Multer.File>();
    (req.files as Express.Multer.File[]).forEach((file) => {
      filesMap.set(file.fieldname, file);
    });

    const { title, blocks, category } = req.body;

    if (!title || !blocks || !category) {
      return res.status(400).json({ error: 'Inputs are required' });
    }

    const parsedBlocks: BlockPayload[] = JSON.parse(blocks);

    const uploadedBlocks: {
      type: BlockPayload['type'];
      value?: string;
      order: number;
    }[] = [];

    for (let i = 0; i < parsedBlocks.length; i++) {
      const block = parsedBlocks[i];

      // inside loop
      if (block.type === 'image') {
        const file = filesMap.get(`file-${block.fileIndex}`);
        if (!file) {
          return res.status(400).json({ error: `Missing file for image block at index ${i}` });
        }

        const uploadResult = await uploadToCloudinary(file.path, 'blog_blocks');

        uploadedBlocks.push({
          type: 'image',
          value: uploadResult.secure_url,
          order: i,
        });
      } else {
        uploadedBlocks.push({
          type: block.type,
          value: block.value || '',
          order: i,
        });
      }
    }

    // Create blog and nested content blocks
    const newBlog = await prisma.blog.create({
      data: {
        title,
        category,
        contentBlocks: {
          create: uploadedBlocks,
        },
      },
      include: {
        contentBlocks: true,
      },
    });

    return res.status(201).json({ blog: newBlog });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all blogs
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 6;
    const search = (req.query.search as string) || '';
    const category = (req.query.category as string) || '';
    const skip = (page - 1) * limit;

    const whereCondition: any = {};

    if (search) {
      whereCondition.title = {
        contains: search,
        mode: Prisma.QueryMode.insensitive,
      };
    }

    if (category) {
      whereCondition.category = category;
    }

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          contentBlocks: {
            orderBy: { order: 'asc' },
          },
        },
      }),
      prisma.blog.count({ where: whereCondition }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({ blogs, totalPages });
  } catch (error) {
    console.error('[GET_ALL_BLOGS_ERROR]', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
        contentBlocks: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ blog });
  } catch (err) {
    console.error('[GET BLOG BY ID ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
};

export const updateBlogById = async (req: Request, res: Response) => {
  try {

    const filesArray = req.files as Express.Multer.File[];
    const filesMap = new Map<string, Express.Multer.File>();
    filesArray.forEach((file) => {
      filesMap.set(file.fieldname, file);
    });


    const blogId = req.params.id;
    const { title } = req.body;
    const blocks = JSON.parse(req.body.blocks || '[]');

    // 1. Validate
    if (!title || !blocks.length) {
      return res.status(400).json({ error: 'Title and blocks are required' });
    }

    // 2. Upload any new images (check for fileIndex and use that to access uploaded file)
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].type === 'image') {
        const fileIndex = blocks[i].fileIndex;
        const file = filesMap.get(`file-${fileIndex}`);

        if (file) {
          const cloudinaryResult = await uploadToCloudinary(file.path, 'blog_blocks');
          blocks[i].value = cloudinaryResult.secure_url;
        } else if (!blocks[i].value) {
          return res.status(400).json({
            error: `Missing image URL or file for image block at index ${i}`,
          });
        }
        // else: value exists (previous image URL), do nothing
      }
    }

    // 3. Update blog title
    await prisma.blog.update({
      where: { id: blogId },
      data: {
        title,
      },
    });

    // 4. Delete existing blocks
    await prisma.contentBlock.deleteMany({
      where: { blogId },
    });

    // 5. Re-insert blocks in correct order
    const newBlocks = blocks.map((block: any, index: number) => ({
      type: block.type,
      value: block.value || '',
      order: index,
      blogId,
    }));

    await prisma.contentBlock.createMany({
      data: newBlocks,
    });

    return res.status(200).json({ message: 'Blog updated successfully' });
  } catch (error) {
    console.error('[UPDATE BLOG ERROR]', error);
    return res.status(500).json({ error: 'Failed to update blog' });
  }
};

export const deleteBlogById = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;

    const existingBlog = await prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!existingBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    await prisma.blog.delete({
      where: { id: blogId },
    });

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("[DELETE_BLOG_ERROR]", error);
    return res.status(500).json({ error: "Failed to delete blog" });
  }
};

