import express from "express";
import Product from "../models/product.model.js";

const viewsRouter = express.Router();

//endpoints

viewsRouter.get("/", async (req ,res) =>{
    try {
        const {limit=10, page=1} = req.query;
        //lean parsea la info para poder mostrarla en la plantilla, solo endpoint que envia a plantilla data
        const data = await Product.paginate({}, {limit, page, lean: true});
        const products = data.docs;
        delete data.docs;

        const links = [];

        for(let index = 1; index <= data.totalPages; index++){
            links.push({text: index, link: `?limit=${limit}&page${index}`});
        }

        res.render("index", {products, links});
    } catch (error) {
        res.status(500).json({status:"error", message: error.message});
    }
});

export default viewsRouter;