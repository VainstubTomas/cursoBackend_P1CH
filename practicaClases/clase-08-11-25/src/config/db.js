import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_MONGODB);
        console.log("Conectado con Mongo DB.");
    } catch (error) {
        console.log("Error al conectar con Mongo DB.");
    }
}

export default connectMongoDB;