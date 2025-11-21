import express from "express";
import Product from "../models/product.model.js";
import uploader from "../utils/uploader.js";

const productsRouter = express.Router();

productsRouter.get("/", async(req, res)=>{
    try {
        const {limit=10, page=1} = req.query;
        const data = await Product.paginate({}, {limit, page});
        const products = data.docs;
        delete data.docs
        res.status(200).json({status:"success", payload: products, ...data});
    } catch (error) {
        res.status(500).json({status:"error", message: error.message});
    }
});

productsRouter.post("/", uploader.array("thumbnails", 5), async (req, res)=>{
    try {
        //procesamiento de imgs 
        const thumbnails = req.files ? req.files.map(file=>`/images/${file.filename}`):[];

        const newProduct = req.body;//cap valores
        newProduct.thumbnails = thumbnails; //agregamos img
        const product = new Product(newProduct);//creamos instancia local
        await product.save()//sincronizamos a la bd
        res.status(201).json({status:"success", payload: product});
    } catch (error) {
        res.status(500).json({status:"error", message: error.message});
    }
});

productsRouter.put("/:pid", uploader.single("thumbnails"), async (req, res)=>{
    try {
        const pid = req.params.pid;
        const updates = req.body;

        //si la actualizacion es img
        if (req.file) { 
            updates.thumbnails = [`/images/${req.file.filename}`]; 
        }

        const updatedProduct = await Product.findByIdAndUpdate(pid, updates, {new:true});

        //agregar validacion de si no manda null
        if (!updatedProduct) {
            return res.status(404).json({ status: "error", message: `Producto con ID ${pid} no encontrado.` });
        }

        res.status(200).json({status:"success", payload:updatedProduct});
    } catch (error) {
        res.status(500).json({status:"error", message: error.message});
    }
})

export default productsRouter;