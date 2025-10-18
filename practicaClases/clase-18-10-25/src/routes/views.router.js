import express from 'express';
import ProductManager from '../productManager.js';

const viewsRouter = express.Router();
const productManager = new ProductManager("./src/products.json");

//endpoints
viewsRouter.get("/", async(req, res)=>{
    try {
        const user = {username: "Tomás_DEV", isAdmin: true};
        const products = await productManager.getProducts();

        res.render("dashboard", {products, user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default viewsRouter;