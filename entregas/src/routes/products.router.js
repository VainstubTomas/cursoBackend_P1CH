import express from 'express';
import ProductManager from '../productManager.js';
import uploader from '../utils/uploader.js';

    const productRouter = express.Router();
    const productManager = new ProductManager("./src/products.json");

    //endpoints
    productRouter.post('/',uploader.single("file"), async(req, res)=>{
        try {
            //si falta el file bad request 401 porque faltan datos
            if(!req.file){return res.status(401).json({message:"Falta adjuntar la imagen."})};
            if(!req.title){return res.status(401).json({message:"Falta adjuntar la imagen."})};
            if(!req.description){return res.status(401).json({message:"Falta adjuntar la imagen."})};
            if(!req.code){return res.status(401).json({message:"Falta adjuntar la imagen."})};
            if(!req.price){return res.status(401).json({message:"Falta adjuntar la imagen."})};
            if(!req.status){return res.status(401).json({message:"Falta adjuntar la imagen."})};
            if(!req.stock){return res.status(401).json({message:"Falta adjuntar la imagen."})};
            if(!req.category){return res.status(401).json({message:"Falta adjuntar la imagen."})};

            const title = req.body.title;
            const description = req.body.description;
            const code = req.body.code;
            const price = req.body.price;
            const status = req.body.status;
            const stock = req.body.stock;
            const category = req.body.category;
            const thumbnails = '/images/'+ req.file.filename;

            await productManager.addProduct({title, description, code, price, status, stock, category, thumbnails});
            res.redirect('/')
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    });

    // productRouter.delete('/:pid', async(req, res)=>{
    //     try {
    //         const pid = req.params.pid;
    //         const products = await productManager.deleteProductById(pid);
    //         res.status(200).json({message:"producto eliminado correctamente.", products});
    //     } catch (error) {
    //         res.status(500).json({message: error.message});
    //     }
    // });

export default productRouter;