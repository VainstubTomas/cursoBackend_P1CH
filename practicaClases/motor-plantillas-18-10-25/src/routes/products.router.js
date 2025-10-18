import express from 'express';
import ProductManager from '../productManager.js';
import uploader from '../utils/uploader.js';

const productRouter = express.Router();
const productManager = new ProductManager("./src/products.json");

productRouter.post("/", uploader.single("file"), async (req, res)=>{
    try {
        //si falta el file bad request 401 porque faltan datos
        if(!req.file){return res.status(401).json({message:"Falta adjuntar la imagen."})}

        const title = req.body.title;
        const price = req.body.price;
        const thumbnail = "/assets/" + req.file.filename;

        await productManager.addProduct({title, price, thumbnail});
        res.redirect("/");
    } catch (error) {
        res.status(500).json({message: error.message});
    }

});

export default productRouter;