import { IMulterFile } from './../types/products.types';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Request } from 'express';
import streamifier from 'streamifier';

// Multer middleware to handle file uploads and add them to req.files object limit file size to 5mb
export const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
	},
});

// upload images to cloudinary products folder  and return the image url
export const imageUploader = async (file: IMulterFile) => {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			{ folder: 'products' },
			(error, result) => {
				if (result) {
					resolve(result);
				} else {
					reject(error);
				}
			}
		);

		streamifier.createReadStream(file.buffer).pipe(stream);
	});
};
