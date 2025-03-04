import express from "express";
import userRegisterController from "../controllers/userRigisterController";
import userLoginController from "../controllers/userLoginController";
const router = express.Router();

router.use('/register',userRegisterController); 
router.use('/login',userLoginController);

export default router;
