import express from "express";
import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/cart.router.js";
import viewsRouter from "./src/routes/views.router.js";
import connectMongoDB from "./src/config/db.js";
import dotenv from "dotenv";
import { engine } from "express-handlebars";

//variables de entorno
dotenv.config();

const app = express();
app.use(express.json());

connectMongoDB();

//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//endpoints
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, ()=>{
    console.log("Servidor iniciado correctamente");
})