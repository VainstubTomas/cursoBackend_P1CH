import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    title: String,
    description: {type:String, index: "text"},
    thumbnails: {type: Array, default: []},
    code: {type: String, unique: true},
    price: Number,
    stock: Number,
    category: {type: String, index: true},
    status: {
        type: Boolean,
        default: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    }
});

//plugin de paginacion
productSchema.plugin(paginate);

//en base al schema creamos un modelo que se ahce una vez para exportarlo
const Product = mongoose.model("Product", productSchema);

export default Product;