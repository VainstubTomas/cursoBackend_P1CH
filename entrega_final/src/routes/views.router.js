import express from "express";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async(req, res)=>{
    try {

        const {limit=10, page=1} = req.query;
        const data = await Product.paginate({}, {limit, page, lean: true});
        const products = data.docs;

        const links = [];

        for(let index = 1; index <= data.totalPages; index++){
            links.push({text: index, link: `?limit=${limit}&page${index}`});
        }

        res.render("index", {products, links});
    } catch (error) {
        res.status(500).json({status:"error", message: error.message});
    }
});

//view de la descripcion
viewsRouter.get("/product/:pid", async (req, res)=>{
    try {
        const pid = req.params.pid;
        const product = await Product.findById(pid , null, {lean:true});
        res.render("productDescription", {product});
    } catch (error) {
        res.status(500).json({status:"error", message: error.message});
    }
})

//obtener carrito
viewsRouter.get("/carts/:cid", async(req, res)=>{
    try {
        const cid = req.params.cid;
        
        const cart = await Cart
            .findById(cid)
            .populate('products.product')
            .lean();

        if (!cart) {
            return res.status(404).json({ status: "error", message: `Carrito con ID ${cid} no encontrado.` });
        }

        res.render("cart", {cart});
    } catch (error) {
        res.status(500).json({status:"error", message: error.message});
    }
})

export default viewsRouter;