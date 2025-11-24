import express from "express";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async(req, res)=>{
    try {

        const {limit=10, page=1, category, available, sort} = req.query;
        //objeto de filtro y ordenamiento
        let filter = {};
        let sortOptions = {};

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sortOptions, 
            lean: true
        }

        const data = await Product.paginate(filter, options);
        const products = data.docs;

        const links = [];

        const currentQueries = { ...req.query };
        delete currentQueries.page;
        const baseQueryString = new URLSearchParams(currentQueries).toString();
        
        for (let index = 1; index <= data.totalPages; index++) {
             const link = `/?page=${index}&${baseQueryString}`; 

             links.push({
                 text: index, 
                 link: link,
                 isCurrent: index === data.page 
             });
        }

        res.render("index", { 
            products, 
            links, 
            ...data,
            limit: limit, 
            category: category, 
            sort: sort 
        });
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