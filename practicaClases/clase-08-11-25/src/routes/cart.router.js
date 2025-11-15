import express from "express";
import Cart from "../models/cart.model.js";

const cartsRouter = express.Router();

//endpoints

//carrito vacio => default:[]
cartsRouter.post("/", async(req , res)=>{
    try {
        const cart = new Cart();
        await cart.save();
        res.status(201).json({status: "success", payload: cart});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

cartsRouter.post("/:cid/product/:pid", async(req , res)=>{
    try {
        //esto declara en la misma linea lo q recibe en los parametros (IDs)
        const {cid, pid} = req.params;
        const {quantity = 1} = req.body; //deafult = 1
        const updatedCart = await Cart.findByIdAndUpdate(cid, {$push: {products: {product: pid, quantity}}}, {new: true, runValidators: true});
        res.status(200).json({status:"success", payload: updatedCart});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

cartsRouter.get("/:cid", async (req , res) => {
    try {
        const cid = req.params.cid;
        const cart = await Cart.findById(cid).populate("products.product");
        if(!cid) return res.status(404).json({status: "error", message: "Carrito no encontrado"});
        res.status(200).json({status: "success", payload: cart.products});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
});

export default cartsRouter;