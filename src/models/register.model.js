import mongoose  from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userschema = new Schema({
    username:{
        type:String,
        required:[true, "name is required"],
        trim:true,
        maxlength:[50, "max length is 50 characters"],


    },
    name:{
        type:String,
        required:[true, "name is required"],
        trim:true,
        maxlength:[50, "max length is 50 characters"],


    },
    email:{
        type:String,
        required:[true, " email is required"],
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please provide a valid email"

        , "please enter valid email"],
        trim:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minimumlength:[8, "minimum length is 8 characters"],
        trim:true,
    },
    role:{
        type: String,
        required: [true, "role is required"],
        enum:['user',' service_provider'],
        default:'user',
    },
    refreshtoken:{
      type:String,
    }
},
{
    timestamps:true,
}
)
// 1. Password Hashing Pre-Save Hook
userschema.pre('save', async function () {
  // Pass control further if password is not modified
  if (!this.isModified('password')) return ;

  
    const salt = await bcrypt.genSalt(6); //  Fix: bcrypt.genSalt
    this.password = await bcrypt.hash(this.password, salt); //  Fix: bcrypt.hash
    // next();
  
    // next(error);
  
});

// 2. Password Comparison Method
userschema.methods.matchpassword = async function (password) {
  return await bcrypt.compare(password, this.password); 
};
userschema.methods.generateAccessToken=function(){
  jwt.sign({
    _id:this._id,
    email:this.email,
    username:this.username,

  },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY || "1d"
    }
);}
userschema.methods.generateRefreshToken=function(){
  jwt.sign({
    _id:this._id,

  },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}
export default mongoose.model('User', userschema)