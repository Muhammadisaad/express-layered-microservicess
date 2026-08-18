import userschema from "../models/register.model.js";
import asyncHandler from "../utils/asyncHandler.js";    
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const loginUser = asyncHandler(async(req , res)=>{

const {username , email , password} = req.body;


    if(!( email  && password)){

        throw new ApiError(400, "all fields are required")

    }
    const user = await userschema.findOne({
        $or:[
            {
            username:username},
          {  email:email
        }]
        
    
    });
    
    if (!user) {
        throw new ApiError(404,false ,"user not found")
    
    }
    const isPasswordCorrect = await user.matchpassword(password);
    if( !isPasswordCorrect){

        throw new ApiError(401,false,"invalid credentials")
    }
    const accessToken= user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();


    user.refreshToken = refreshToken;
     await user.save ({
        validateBeforeSave:false
    });
    
         return res.status(201).json(
              new ApiResponse(201,true,`Dear ${user.name}  you are login successfully` ,{
                // username:user.username,
                name:user.name,
                email:user.email,
                role:user.role,
                createdAt:user.createdAt,
                updatedAt:user.updatedAt

            
              })
            )




})
export default loginUser;
console.log('exported succ login')