import express from "express";
import Product from "../models/product.model.js";

const productsRouter = express.Router();

//endpoints

productsRouter.get("/", async(req, res)=>{
    try {
        const products = await Product.find();
        res.status(200).json({status: "success", payload: products});
    } catch (error) {
        res.status(500).json({status: "error", message: "error al recuperar los productos"});
    }
});

productsRouter.post("/", async(req, res)=>{
    try {
        const newProduct = req.body;//capturamos valores del producto
        const product = new Product(newProduct); //creamos el producto localmente
        await product.save(); //lo sincronizamos a la BD
        res.status(201).json({status: "success", payload: product});
    } catch (error) {
        res.status(500).json({status: "error", message: "error al crear producto"});
    }
});

productsRouter.put("/:pid", async(req, res)=>{
    try {
        const pid = req.params.pid;
        const updates = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(pid, updates, {
            new:true, //asegura que se devuelva la informacion actualizada, sino devuelve la info previa a la actualizacion
            runValidators:true, //valida que se cumpla el esquema
        });

        //si se ecnuentra el producto continua, sino corta la ejecucion
        if(!updatedProduct) return res.status(404).json({status: "error", message: "producto no encontrado"});

        res.status(200).json({status: "success", payload:updatedProduct});
    } catch (error) {
        res.status(500).json({status: "error", message: "error al actualizar producto"});
    }
});

productsRouter.delete("/:pid", async(req, res)=>{
    try {
        const pid = req.params.pid;
        const deletedProduct = await Product.findByIdAndDelete(pid);

        //si se ecnuentra el producto continua, sino corta la ejecucion
        if(!deletedProduct) return res.status(404).json({status: "error", message: "producto no encontrado"});

        res.status(200).json({status: "success", payload:deletedProduct});
    } catch (error) {
        res.status(500).json({status: "error", message: "error al eliminar producto"});
    }
})

export default productsRouter;