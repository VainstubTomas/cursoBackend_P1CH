import express from 'express';
import ProductManager from '../productManager.js';

const productRouter = express.Router();
const productManager = new ProductManager("./src/products.json");

//endpoints
