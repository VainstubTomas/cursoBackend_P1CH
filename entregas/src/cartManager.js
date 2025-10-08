import fs from "fs/promises";
import crypto from "crypto";
import ProductManager from "./productManager.js";

const productManager = new ProductManager("./products.json");

class CartManager{
    constructor(pathFile){
        this.pathFile=pathFile;
    }

    generateNewId(){
        return crypto.randomUUID();
    }

    async readFile(){
        try { 
            const fileData = await fs.readFile(this.pathFile, 'utf-8');
            if(!fileData.trim()){return []}
            const carts = JSON.parse(fileData);
            return carts; 
        } catch (error) {
            if(error.code === 'ENOENT'){
                console.log("El archivo no existe.");
                return [];
            } else {
                console.log("Error desconocido; ", error.message);
            }
        }
    }

    async newCart(){
        try {
           const carts = await this.readFile();
           const newId = this.generateNewId();
           const cart = {id:newId, products:[]};
           carts.push(cart);

           await fs.writeFile(this.pathFile, JSON.stringify(carts, null, 2), "utf-8");

           return carts;
        } catch (error) {
            throw new Error("Error al crear nuevo carrito: " + error.message);
        }
    }

    async getCartById(cid){
        try {
            const carts = await this.readFile();
            const cart = carts.find((cart)=>cart.id===cid);
            if(!cid){console.log("carrito no encontrado")};
            return cart;
        } catch (error) {
            throw new Error("Error al crear nuevo carrito: " + error.message);
        }
    }
    // API/CARTS/:CID/PRODUCTS/:PID
    async addProduct(cid, pid){
        try {
           const cart = await this.getCartById(cid);
           const product = await productManager.getProductById(pid);
           const existingItem = cart.products.find((product)=>product.id===pid);
           if(!existingItem){
                cart.products.push({product:product.id, quantity:1});
                return cart;
           }else if(existingItem){
                existingItem.quantity+=1;
                return cart;
           };
        } catch (error) {
            throw new Error("Error al agregar producto: " + error.message);
        }
    }
};

// export default CartManager;

 async function main() {
     try {
         const cartManager = new CartManager("./src/carts.json");
         await cartManager.addProduct("66f2ad1b-50bb-445d-8da5-33fd8ddc1c97","6474d9e6-e3fc-4d77-9fb6-cad4fe2a54cd");
     } catch (error) {
         console.log(error);
     }
 }

main();