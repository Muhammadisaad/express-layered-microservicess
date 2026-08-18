
console.log("loading registeruser");
import User from "../models/register.model.js"
// import  asyncHandler  from "../utils/asyncHandler.old.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
 const registerUser =  asyncHandler(async (req, res)=>
    {
    
        const {username,name , email ,password,role}= req.body;
       
        let user;

        try
        {
             user = await User.create(
            {
               username, name,email,password,role:'user'
            });
          
         return res.status(201).json(
              new ApiResponse(201,"user registered successfully",{
                // username:user.username,
                name:user.name,
                email:user.email,
                role:user.role,
                createdAt:user.createdAt,
                updatedAt:user.updatedAt

            
              })
         );

        }catch(error)
        {   
            if(error.code===11000){
            throw new ApiError(409, "user already exist",error.message)

            }
            console.log("mongoose error",error);
              throw new ApiError(500,"internal server error",error.message)
        }
     
    
    }
);
export {  registerUser } ;
// console.log("file exported ")

