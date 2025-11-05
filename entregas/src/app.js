import express from "express";
import {engine} from "express-handlebars";
import {Server} from 'socket.io';
import http from 'http';
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./productManager.js";

const app = express();
app.use(express.json());
//permitir la recepcion de formularios
const server = http.createServer(app);
const io = new Server(server);

//public (static elements) definition
app.use(express.static("public"));
//product manager instance
const productManager = new ProductManager("./src/products.json");

//handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//io instance 
io.on("connection", (socket)=>{
    console.log("Cliente id:"+socket.id+" conectado al servidor");

    //new products from client form
    socket.on("new product", async(productData)=>{
        try {
            await productManager.addProduct(productData); 
            const updatedProducts = await productManager.getProducts();
            io.emit("products updated", {products: updatedProducts})  
        } catch (error) {
            console.error("Error al agregar producto por WebSocket:", error);
            socket.emit("error", { message: "Fallo al guardar producto." });
        }
    });

    //delete products
    socket.on("delete product", async(pid)=>{
        try {
            await productManager.deleteProductById(pid);
            const updatedProducts = await productManager.getProducts();
            io.emit("products updated", {products: updatedProducts})
        } catch (error) {
            console.error("Error al eliminar producto por WebSocket:", error);
            socket.emit("error", { message: "Fallo al eliminar el producto." });
        }  
    });
});

//endpoints
app.use('/', viewsRouter);

server.listen(8080,()=>{
    console.log("servidor iniciado correctamente en el puerto 8080");
});