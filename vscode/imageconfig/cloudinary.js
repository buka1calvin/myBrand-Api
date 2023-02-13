import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
	cloud_name:"dd92qmql1",
	api_key:556927774176551,
	api_secret:"OkGy7wkqkTGLlFeBrjPA5ePcVBs"
})
const storage=new CloudinaryStorage(
    {
        cloudinary:cloudinary,
        params:{
            folder:"DEV"
        },
    }
);
const upload = multer({ storage: storage });
export default upload