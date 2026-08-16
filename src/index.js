import dotenv from 'dotenv';
dotenv.config({
  path: "./env"
});
import express from 'express';
import mongoose from 'mongoose';
import connectDb from  './config/db.config.js';
import { connect } from 'mongoose';
import authRoutes from './routes/auth.route.js';



const app = express();
app.use(express.json());

const PORT = process.env.PORT ;
app.use('/api/v1/auth', authRoutes);
 const startserver = async () => {
connectDb();
 }
try{

    app.listen(process.env.PORT,()=>{    
      console.log(`server is running on port ${process.env.PORT}`)})
  }catch(err){
      console.error(err.message);
  }
    // import mongoose from "mongoose";

startserver();