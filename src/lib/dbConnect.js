import mongoose from "mongoose";

export default async function dbConnect() {
    try {
        const dbConnected = await mongoose.connect(process.env.MONGODB_URI); 
        console.log(`MongoDB!!! connected: ${dbConnected.connection.host}`);   
    } 
    catch (error) {
        console.log("MongoDB connection error!!!" ,error);
        process.exit(1);
    }
};