import express from "express";
import Cart from "../models/cart.model.js";

const cartsRouter = express.Router();

//endpoints
cartsRouter.get("/:cid", async (req, res)=>{
    try {
        const cid = req.params.cid;
        const cart = await Cart.findById(cid).populate("products.product");
        res.status(200).json({status:"success", payload: cart});
    } catch (error) {
        res.status(500).json({status:"error", message:error});
    }
})

cartsRouter.post("/:cid/product/:pid", async(req , res)=>{
    try {
        const {cid, pid} = req.params;
        const {quantity = 1} = req.body;
        const updatedCart = await Cart.findByIdAndUpdate(cid, {$push: {products: {product: pid, quantity}}}, {new: true, runValidators: true});
        res.status(200).json({status:"success", payload: updatedCart});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

cartsRouter.delete("/:cid/product/:pid", async (req, res)=>{
    try {
        const {cid, pid} = req.params;
        
        const updatedCart = await Cart.findByIdAndUpdate(
            cid,
            { $pull: { products: { product: pid } } }, 
            { new: true, runValidators: true }
        );

        if (!updatedCart) {
             return res.status(404).json({ status: "error", message: `Carrito ID ${cid} o Producto ID ${pid} no encontrado.` });
        }
        
        res.status(200).json({ 
            status: "success", 
            message: `Producto ${pid} eliminado del carrito ${cid}.`,
            payload: updatedCart 
        });
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

//DELETE api/carts/:cid deberá eliminar todos los productos del carrito
cartsRouter.delete("/:cid", async(req, res)=>{
    try {
       const cid = req.params.cid;
        const updatedCart = await Cart.findByIdAndUpdate(cid, 
            {$set: {products:[]}},
            {new:true}
        ) 
        res.status(201).json({status:"success", payload:updatedCart});
    } catch (error) {
       res.status(500).json({status: "error", message: error.message}); 
    }
});

export default cartsRouter;