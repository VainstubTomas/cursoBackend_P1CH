import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/assets");
    },
    filename: (req, file, callback) => {
        const newFileName = Date.now()+"-"+file.originalname;
        callback(null, newFileName);
    }
});

//middleware - intermediario entre solicitudes
const uploader = multer({storage});

export default uploader;