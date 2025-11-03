import express from "express";
import {engine} from "express-handlebars";
import {Server} from 'socket.io';
import http from 'http';
import viewsRouter from "./routes/views.router.js";

const app = express();
app.use(express.json());
//permitir la recepcion de formularios
const server = http.createServer(app);
const io = new Server(server);

//public (static elements) definition
app.use(express.static("public"));

//handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//io deploy 
io.on("connection", (socket)=>{
    console.log("Cliente id:"+socket.id+" conectado al servidor");
});

//endpoints
app.use('/', viewsRouter);

server.listen(8080,()=>{
    console.log("servidor iniciado correctamente en el puerto 8080");
});