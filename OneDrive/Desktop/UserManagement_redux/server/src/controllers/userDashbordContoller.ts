import { Request , Response } from "express"

export const editUserProfile = async (req:Request, res:Response)=>{
        const {name, email , Mobile, gender} = req.body;
}