import fs from "fs/promises";
import crypto from "crypto";

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
};

export default CartManager;

//  async function main() {
//      try {
//          const cartManager = new CartManager("./src/carts.json");
//          const getProd = await cartManager.getCartById("242a173f-603f-4149-9c2b-266af39766fb");
//         console.log(getProd);
//      } catch (error) {
//          console.log(error);
//      }
//  }

// main();