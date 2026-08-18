import { Router } from "express";
import { validateUser}  from "../middlewares/auth.middleware.js";
import   { registerUser }  from "../controllers/auth.controller.js";
// import registerUser from "../controllers/auth.controller.js";
import loginUser from "../controllers/user.login.controller.js";
const router = Router();



console.log("validate user is :",validateUser);
console.log("register user is :",registerUser);

router.post('/register',validateUser , registerUser);
router.post('/login',loginUser);


export default router;

