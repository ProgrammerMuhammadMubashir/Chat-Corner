
import { v2 as cloudinary } from "cloudinary"

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config()

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
      }); //Declarations for connection to cloud storage
    
  const storage = new CloudinaryStorage({
        cloudinary,
        params: {
          folder: "uploads",
          format: async (req, file) => "jpg", 
          public_id: (req, file) => Date.now() + "-" + file.originalname,
        },
      });
      const upload = multer({ storage });
export default upload
