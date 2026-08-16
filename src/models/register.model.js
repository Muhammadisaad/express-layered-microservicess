import mongoose  from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userschema = new Schema({
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
        enum:['user',' service_provider'],
        default:'user',
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

  try {
    const salt = await bcrypt.genSalt(10); //  Fix: bcrypt.genSalt
    this.password = await bcrypt.hash(this.password, salt); //  Fix: bcrypt.hash
    // next();
  } catch (error) {
    // next(error);
  }
});

// 2. Password Comparison Method
userschema.methods.matchpassword = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password); // ✅ Fix: bcrypt.compare
};
export default mongoose.model('User', userschema);