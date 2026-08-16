import dotenv from 'dotenv';
import express from 'express';
import connectDb from  './config/db.config.js';
import { connect } from 'mongoose';
import authRoutes from './routes/auth.route.js';
dotenv.config({
  path: "./env"
});


const app = express();
app.use(express.json());

const PORT = process.env.PORT ;
app.use('/api/v1/auth', authRoutes);
 
connectDb();

try{

    app.listen(process.env.PORT,()=>{    
      console.log(`server is running on port ${PORT}`)})
  }catch(err){
      console.error(err.message);
  }
    import mongoose from "mongoose";

