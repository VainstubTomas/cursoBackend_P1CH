import multer from "multer";

const storage = multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null, "./public/images");
    },
    filename:(req, file, callback)=>{
        const newFileName=Date.now()+"-"+file.originalname;
        callback(null, newFileName);
    }
});

//middleware necesario para usar en HTTP/S
const uploader = multer({storage});
export default uploader;