/*=============================================== Cloudinary config ===============================================*/

import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import multer from "multer"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        // @ts-expect-error
        folder: "tsx-apollo",
    },
})

const fileUploader = multer({ storage })

export default fileUploader
