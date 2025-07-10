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
