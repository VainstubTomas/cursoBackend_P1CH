import express from 'express';
import ProductManager from '../productManager.js';
import uploader from '../utils/uploader.js';

const productsRouter = express.Router();
const productManager = new ProductManager("./src/products.json");

//endpoints
productsRouter.post("/", uploader.array("thumbnails", 5), async (req, res)=>{
    try {
        //procesamiento de imagenes cargadas desde el Cliente
        const thumbnails = req.files ? req.files.map(file => `/images/${file.filename}`) : [];

        //validacion de estado producto
        let status = true;
        if(req.body.status !== undefined){
            status = req.body.status === "true" || req.body.status === true || req.body.status === "1";
        };

        const productData={
            title: req.body.title,
            description: req.body.description,
            code : req.body.code,
            price: parseFloat(req.body.price),
            status: parseInt(req.body.status),
            category: req.body.category,
            thumbnails: thumbnails.length>0 ? thumbnails:[]
        };

        //agregar producto al array de productos
        const product = await productManager.addProduct(productData);
        console.log("Producto creado: ", product);
        const updatedProducts = await productManager.getProducts();

        //actualizacion del cliente en tiempo real
        if(req.io){
            req.io.emit("products updated", updatedProducts);
            console.log("products updated emitido con exito");
        } else {
            console.log("Error al realizar req.io.emit en products.js");
        }

        res.status(201).json({
            message: "Producto creado y lista actualizada enviada por WebSocket",
            product: productData,
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }  
});

export default productsRouter;