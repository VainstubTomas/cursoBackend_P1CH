import express from "express";
import http from "http";
import dotenv from "dotenv";
import {engine} from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import connectMongoDB from "./config/db.js";

//variables de entorno
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));
const server = http.createServer(app);

//conexion bd
connectMongoDB();

//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//endpoints
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

server.listen(8080, ()=>{
    console.log("Servidor iniciado correctamente en el puerto 8080");
});