import express from "express";
import  cors from "cors";
import cookieParser from "cookie-parser";
import userroutes from "./routes/auth.route.js";
import passport from "./config/passport.config.js";
import session from "express-session";


const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN
    ,credentials:true
}));
app.use(express.json({
    limit:"16kb"
}))
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(session({
    secret:process.env.SESSION_SECRET || "fall_bacl_secret_change_to_this",
    resave:false,
    saveUninitialized:false,
    // cookie:{
    //     // secure:process.env.NODE_ENV ==== "production",/
    //     maxAge:24*60*60*1000
    // }
}));


app.use("/api/v1/auth",userroutes);
// app.use('/api/v1/auth')


export {app}

