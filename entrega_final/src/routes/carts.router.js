import express from "express";
import Cart from "../models/cart.model.js";

const cartsRouter = express.Router();

//endpoints

//DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.

//DELETE api/carts/:cid deberá eliminar todos los productos del carrito