import { response } from "express";
import User from "../models/register.model.js"
 const registerUser = async (req, res)=>{
    try {
        const {name , email ,password,role}= req.body;


        const user = await User.create({
            name,email,password,role:'user'
        });
        const userResponse ={
            name:user.name,
            email:user.email,
            role:user.role,
            createdat:user.createdAt
         };
        return res.status(201).json({
            success:true,
            message:"user registered successfully",
             data:userResponse   
            
        });
        

    }catch(error)
    {
            if(error.code=11000){
                return res.status(409).json({
                    success:false,
                    message:"user already exist",
                    error:error.message
                });
            }
            return res.status(500).json({
                success:false,
                message:"internal server error"
            });
        }

        //check if user already exist
        //  const existingUser = await User.findOne({email});
        //  if(existingUser){
        //     return res.status(400).json(
        //         {
        //             success:false,
        //             message:"user aready exist"
        //         }
        //     )
        //  }

         //create user if not exists
        //  const user = await User.create({
        //     name,
        //     email,
        //     password,
        //     role
        //  })
         //give response data
         



    // } catch (error) {
    //     console.error("REGISTER CONTROLLER ERROR:", error);
    //     res.status(500).json({
    //         success:false,
    //         message:"internal server error"
    //     });
        
    // };
}
export default registerUser;

