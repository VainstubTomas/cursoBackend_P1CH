import express from 'express';
//engine => motor de plantillas
import { engine } from 'express-handlebars';
//manejador
import viewsRouter from './routes/views.router.js';
import productRouter from './routes/products.router.js';

const app = express();
app.use(express.json());
//habilitamos arachivos estaticos
app.use(express.static("public"));
//habilitamos podes recibir desde un formulario
app.use(express.urlencoded({extended:true}));

//handlebars config
app.engine("handlebars", engine()); //habilitamos el motor
app.set("view engine", "handlebars"); //seteamos el motor x defecto
app.set("views", "./src/views"); //a donde se guardan las vistas

//endpoints
app.use("/", viewsRouter);
app.use("/api/products", productRouter);

app.listen(8080, ()=>{
    console.log("Servidor iniciado en el puerto 8080.")
})