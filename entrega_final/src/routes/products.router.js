import express from "express";
import Product from "../models/product.model.js";

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

export default productsRouter;