 import dotenv from "dotenv";
 dotenv.config({
  path: "./.env"
});
import express from 'express';
import mongoose from 'mongoose';
import connectDb from  './config/db.config.js';
import { app } from './app.js';


connectDb()
.then(()=>{
  app.listen(process.env.PORT|| 3000,()=>{
    console.log(`server is running at ${process.env.PORT}`)
  });
})
.catch((err)=>{
  console.log("mongodb connection failed",err);
})






































// import dotenv from 'dotenv';
// dotenv.config({
//   path: "./.env"
// });
// import express from 'express';
// import mongoose from 'mongoose';
// import connectDb from  './config/db.config.js';
// import { connect } from 'mongoose';
// import authRoutes from './routes/auth.route.js';



// const app = express();
// app.use(express.json());

// const PORT = process.env.PORT ;
// app.use('/api/v1/auth', authRoutes);

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message|| "internal server error";
//   res.status(statusCode).json({
//     success:false,
//     message:message,
//     error: err.errors ||[],
  
//   });
// });
// // next();

//  const startserver = async () => {
// connectDb();
//  }
// try{

//     app.listen(process.env.PORT,()=>{    
//       console.log(`server is running on port ${process.env.PORT}`)})
//   }catch(err){
//       console.error(err.message);
//   }
//     // import mongoose from "mongoose";

// startserver();