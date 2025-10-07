import express from "express";
import ProductManager from "./productManager.js";
import CartManager from "./cartManager.js";

const app = express();
//habilitador para poder recibir info en formato json
app.use(express.json());
const productManager = new ProductManager("./src/products.json");
const cartManager = new CartManager("./src/carts.json");

//endpoints

app.get("/",(req, res)=>{
    res.json({status:"success", message:"Hola! Esta es la raiz de los endpoints del proyecto!"});
});

//products endpoints

app.get("/api/products", async (req, res)=>{
    try {
        const products = await productManager.getProducts();
        res.status(200).json({message: "Lista de productos", products});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get("/api/products/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        const product = await productManager.getProductById(pid);
        res.status(200).json({message:"producto encontrado", product});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.delete("/api/products/:pid", async(req, res)=>{
    try {
        const pid = req.params.pid;
        const products = await productManager.deleteProductById(pid);
        res.status(200).json({message: `Producto id=${pid} eliminado correctamente.`, products})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post("/api/products/", async(req, res)=>{
    try {
        const newProduct = req.body;
        const products = await productManager.addProduct(newProduct);
        res.status(201).json({message:"producto agregado.", products});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.put("/api/products/:pid", async(req, res)=>{
    try {
        const pid = req.params.pid;
        const updates = req.body;
        const products = await productManager.setProductById(pid, updates);
        res.status(200).json({message:"modificaciones realizadas.", products});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//carts endpoints

app.post("/api/carts/", async (req, res) => {
    try {
        const newCart = req.body;
        const cart = await cartManager.newCart(newCart)
        res.status(201).json({message:"carrito creado exitosamente", cart});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get("/api/carts/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const cart = await cartManager.getCartById(cid);
        res.status(200).json({message:"carrito encontrado", cart});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.listen(8080,()=>{
    console.log("servidor iniciado correctamente en el puerto 8080");
});