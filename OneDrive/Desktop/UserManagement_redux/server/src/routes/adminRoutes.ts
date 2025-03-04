import express from "express";
import { userList, updateUser, deleteUser } from "../controllers/adminDashbordController";



const adminRouter = express.Router();

adminRouter.use('/userDetails', userList);
adminRouter.delete("/deleteUser",deleteUser);
adminRouter.put("/updateUser/:id", updateUser);

export default adminRouter;
