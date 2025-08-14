// utils/cloudinaryUpload.ts

import fs from 'fs';
import cloudinary from './cloudinary';

export const uploadToCloudinary = async (filePath: string, folder: string) => {
    return new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload(
            filePath,
            {
                folder,
                resource_type: 'auto', // handles image, pdf, video, etc.
            },
            (error, result) => {
                // Safely delete the file only if it exists
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }

                if (error) return reject(error);
                resolve(result);
            }
        );
    });
};