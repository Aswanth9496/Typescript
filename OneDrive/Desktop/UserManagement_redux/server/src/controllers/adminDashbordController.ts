import { Request, Response } from "express";
import User from "../models/userModel";


export const userList = async (req: Request, res: Response) => {
    try {
        const userDetails = await User.find();
        res.status(200).json({ success: true, users: userDetails });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



export const deleteUser = async (req: Request, res: Response):Promise<void> => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ success: false, message: "Email is required" });
            return
        }

        const deletedUser = await User.findOneAndDelete({ email });

        if (!deletedUser) {
            res.status(404).json({ success: false, message: "User not found" });
            return
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });
        return

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return
    }
};


export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, email, mobile, gender } = req.body;

        if (!name || !email) {
            res.status(400).json({ success: false, message: "Name and Email are required" });
            return;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, mobile, gender },
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
