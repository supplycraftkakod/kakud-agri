import { Request, Response } from 'express';
import prisma from '../prisma';
import { Prisma } from "@prisma/client";

// get all product
// export const getAllProducts = async (req: Request, res: Response) => {
//   try {
//     // Get pagination params from query, default: page 1, limit 10
//     const page = parseInt(req.query.page as string) || 1;
//     const limit = parseInt(req.query.limit as string) || 10;

//     const skip = (page - 1) * limit;

//     // Get total count for pagination metadata
//     const totalProducts = await prisma.product.count();

//     // Get paginated products
//     const products = await prisma.product.findMany({
//       skip,
//       take: limit,
//       orderBy: { lastUpdated: "desc" }, // optional: order by latest update
//       include: {
//         about: true,
//         benefits: true,
//         activeIngredients: true,
//         formulationTypes: true,
//         crops: true,
//       },
//     });

//     // Format products for frontend
//     const formattedProducts = products.map(product => ({
//       id: product.id,
//       name: product.name,
//       category: product.category,
//       imageUrl: product.imageUrl,
//       description: product.description,
//       lastUpdated: product.lastUpdated,

//       aboutPoints: product.about.map(item => item.content),
//       benefitPoints: product.benefits.map(item => item.content),
//       activeIngredients: product.activeIngredients.map(item => item.content),
//       formulationTypes: product.formulationTypes.map(item => item.content),
//       crops: product.crops.map(item => item.content),
//     }));

//     // Calculate total pages
//     const totalPages = Math.ceil(totalProducts / limit);

//     // Send response
//     res.status(200).json({
//       success: true,
//       page,
//       limit,
//       totalPages,
//       totalProducts,
//       products: formattedProducts,
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// get all product with search
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;
    const skip = (page - 1) * limit;
    const search = (req.query.search as string || "").trim();
    const categoriesParam = (req.query.categories as string) || "";
    const categories = categoriesParam.split(",").filter(Boolean);

    const whereClause: Prisma.ProductWhereInput = {
      ...(search && {
        name: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
      ...(categories.length > 0 && {
        category: {
          in: categories,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
    };

    const [totalProducts, products] = await Promise.all([
      prisma.product.count({ where: whereClause }),
      prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { lastUpdated: "desc" },
        where: whereClause,
        include: {
          about: true,
          benefits: true,
          activeIngredients: true,
          formulationTypes: true,
          crops: true,
        },
      }),
    ]);

    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      imageUrl: product.imageUrl,
      description: product.description,
      lastUpdated: product.lastUpdated,
      aboutPoints: product.about.map(item => item.content),
      benefitPoints: product.benefits.map(item => item.content),
      activeIngredients: product.activeIngredients.map(item => item.content),
      formulationTypes: product.formulationTypes.map(item => item.content),
      crops: product.crops.map(item => item.content),
    }));

    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalPages,
      totalProducts,
      products: formattedProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// get single product
export const getSingleProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        about: true,
        benefits: true,
        activeIngredients: true,
        formulationTypes: true,
        crops: true,
      },
    });

    if (!product) return res.status(404).json({ success: false, message: "Not found" });

    // format for frontend
    const formatted = {
      ...product,
      aboutPoints: product.about.map(a => a.content),
      benefitPoints: product.benefits.map(b => b.content),
      activeIngredients: product.activeIngredients.map(a => a.content),
      formulationTypes: product.formulationTypes.map(f => f.content),
      crops: product.crops.map(c => c.content),
    };

    res.status(200).json({ success: true, product: formatted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Increment product views
export const incrementProductView = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  try {
    const updated = await prisma.product.update({
      where: { id: productId },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    res.status(200).json({ message: "View incremented", views: updated.views });
  } catch (err) {
    res.status(500).json({ error: "Failed to increment view count" });
  }
};
