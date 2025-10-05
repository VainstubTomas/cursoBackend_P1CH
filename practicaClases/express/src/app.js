import express from "express";
import ProductManager from "./productManager.js";

const app = express();
//habilitador para poder recibir info en formato json
app.use(express.json());
const productManager = new ProductManager("./src/products.json");

//endpoint
app.get("/",(req, res)=>{
    res.json({status:"success", message:"hola mundo"});
});
//se declara async para poder usar trycatch
app.get("/api/products", async (req, res)=>{
    try {
        const products = await productManager.getProducts();
        res.status(200).json({message: "Lista de productos", products});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

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

app.listen(8080,()=>{
    console.log("servidor iniciado correctamente en el puerto 8080");
});