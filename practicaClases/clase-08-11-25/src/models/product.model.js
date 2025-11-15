import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    stock: Number,
    status: {
        type: Boolean,
        default: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    }
});

//en base al schema creamos un modelo que se ahce una vez para exportarlo
const Product = mongoose.model("Product", productSchema);

export default Product;