import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const connectDb = async () =>{
    try{
        const con = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Db connected ${con.connection.host}`);
    
    }catch(err){
        console.error(err.message);
        process.exit(1);
    };
    
}

export default connectDb