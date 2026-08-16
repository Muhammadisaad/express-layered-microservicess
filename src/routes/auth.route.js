import { Router } from "express";
import  validateUser  from "../middlewares/auth.middleware.js";
import   registerUser  from "../controllers/auth.controller.js";
const router = Router();

router.post('/register',validateUser,registerUser);


export default router;

