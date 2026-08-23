import { Router } from "express";
import { validateUser}  from "../middlewares/auth.middleware.js";
import   { registerUser }  from "../controllers/auth.controller.js";
// import registerUser from "../controllers/auth.controller.js";
import loginUser from "../controllers/user.login.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import passport from "passport";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
const router = Router();



console.log("validate user is :",validateUser);
console.log("register user is :",registerUser);

router.post('/register',validateUser , registerUser);
router.post('/login',loginUser);
router.get(
    "/github",passport.authenticate("github",{scope:["user:email"]})
);
console.log("all routes loaded");
router.get(
    "/github/callback",
    
    (req,res,next)=>{
        passport.authenticate("github",
            {session:true},
          
            (err,user,info)=>{
                if(err){
                    console.error("passport error ",err)
                    return next(err);}
                if(!user){
                    console.error("no user returned from passsport")
                return res.status(401).json({
                    success:false,
                    message:"github auth fail"
            });
        }
                        req.user=user;
                        next();
            }

        )(req,res,next);
    },
    asyncHandler(async(req,res)=>{
        if(!req.user){
            console.error("req.user is undefined ")
        }
        const accessToken =req.user.generateAccessToken();
                const refreshToken =req.user.generateRefreshToken();
                req.user.refreshToken=refreshToken;
                await req.user.save({
                    validatBeforeSave: false

                });
               return res.status(200).json({
                success:true,
                message:"github auth success",
                data:{
                    user:{
                        id:req.user._id,
                        username:req.user.username,
                        name:req.user.name,
                        email:req.user.email,
                        role:req.user.role,
                        avatar:req.user.avatar
                    },
                    accessToken,
                    refreshToken
                }
               });
    })

);

// console.log("all routes loaded");
export default router;

