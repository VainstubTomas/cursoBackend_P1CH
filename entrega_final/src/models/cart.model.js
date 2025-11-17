import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            product,
            quantity
        }],
        default: []
    },
    createdAt: {type: Date, default: Date.now}
});

//modelo
const Cart = mongoose.model("Cart", cartSchema);

export default Cart;