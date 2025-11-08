import express from "express";
import {engine} from "express-handlebars";
import {Server} from 'socket.io';
import http from 'http';
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./productManager.js";
import productsRouter from './routes/products.router.js';

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

//endpoints
app.use((req, _res, next) => {
  req.io = io;  // ahora disponible como req.io en cualquier ruta
  next();
});

//io instance 
io.on("connection", (socket)=>{
    console.log("Cliente id:"+socket.id+" conectado al servidor");

    //logica de agregado de productos con HTTP y Multer en products.js

    //delete products
    socket.on("delete product", async(pid)=>{
        try {
            await productManager.deleteProductById(pid);
            const updatedProducts = await productManager.getProducts();
            io.emit("products updated", updatedProducts)
        } catch (error) {
            console.error("Error al eliminar producto por WebSocket:", error);
            socket.emit("error", { message: "Fallo al eliminar el producto." });
        }  
    });
});

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);

server.listen(8080,()=>{
    console.log("servidor iniciado correctamente en el puerto 8080");
});