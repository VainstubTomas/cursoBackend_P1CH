import fs from "fs/promises";
import crypto from "crypto";

class ProductManager{
    constructor(pathFile){
        //direccion del archivo donde estan los productos
        this.pathFile = pathFile;
    }

    generateNewId(){
        return crypto.randomUUID();
    }

    async readFile(){
        try { 
            const fileData = await fs.readFile(this.pathFile, 'utf-8');

            if(!fileData.trim()){
                throw new Error ("Archivo vacio");
            }

            const products = JSON.parse(fileData);

            return products; 
        } catch (error) {
            if(error.code === 'ENOENT'){
                console.log("El archivo no existe.");
            } else if (error.message === "Archivo vacio"){
                console.log("El archivo esta vacio.");
            } else {
                console.log("Error desconocido; ", error.message);
            }
        }
    }

    async addProduct(newProduct){
        try{
            const products = await this.readFile();
            const newId = this.generateNewId();
            const product = {id:newId, ...newProduct};
            products.push(product);

            //pasamos el array a JSON y guardamos los productos en el
            await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2), "utf-8");

            return products;
        }catch(error){
            throw new Error("Error al añadir el nuevo producto: " + error.message);
        }
    }

    async getProducts(){
        try {
            const products = await this.readFile();
            return products;
        } catch (error) {
            throw new Error("Error al traer los productos: " + error.message);
        }
    }

    async setProductById(pid, updates){
        try {
            const products = await this.readFile();

            //buscamos el producto por su id
            const indexProduct = products.findIndex( (product) => product.id === pid);
            if(indexProduct===-1)throw new Error ("Producto no encontrado");

            //manipulamos el array
            //{guardamos datos ya existentes, actualizamos sobre ellas}
            products[indexProduct] = {...products[indexProduct], ...updates}

            //pasamos el array a JSON y guardamos los productos en el
            await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2), "utf-8");

            return products;
        } catch (error) {
            throw new Error("Error al traer los productos: " + error.message);
        }
    }

    async deleteProductById(pid){
        try {
            const products = await this.readFile();

            //buscamos el producto por su id
            const indexProduct = products.findIndex( (product) => product.id === pid);
            if(indexProduct===-1)throw new Error ("Producto no encontrado");

            const newProductsArray = products.filter( (product) => product.id !== pid);

            //pasamos el array a JSON y guardamos los productos en el
            await fs.writeFile(this.pathFile, JSON.stringify(newProductsArray, null, 2), "utf-8");

            return newProductsArray;
        } catch (error) {
            throw new Error("Error al eliminar el producto: " + error.message);
        }
    }
}

//simulacion de que este en otro archivo
async function main(){
    try {
        const productManager = new ProductManager("./products.json");

        //add
        // productManager.addProduct({
        //     "title": "iphone 13",
        //     "price": 400,
        //     "stock": 10
        // })

        //get
        const products = await productManager.getProducts();

        //modify
        //productManager.setProductById("e3e54629-059a-48ad-ad57-1ee3e7069b16", {price: 450});

        //delete
        //productManager.deleteProductById("9168492d-4c57-4b93-ab53-d0a64fd4253c");

        console.log(products);
    } catch (error) {
        console.log(error);
    }
}

main();