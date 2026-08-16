import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const connectDb = async () =>{
    try{
        console.log("Connecting to MongoDB...");
        const con = await mongoose.connect(process.env.MONGODB_URI,{
            serverSelectionTimeoutMS:5000,
            family:4,
        })
        console.log(`Db connected ${con.connection.host}`);
    
    }catch(err){
        console.error(err.message);
        process.exit(1);
    };
    
}

export default connectDb