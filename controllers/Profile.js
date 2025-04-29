
import { v2 as cloudinary } from "cloudinary"

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";


    cloudinary.config({
        cloud_name: "dskx8uqcj",
        api_key: "942364963516862",
        api_secret: "CNlskAOniLWuuNPfa6s060azCxg"
      });
    
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
