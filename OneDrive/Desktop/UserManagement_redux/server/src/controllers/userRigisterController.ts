import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcryptjs";

const userRegisterController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ message: "Something went wrong" });
        return
    }
};

export default userRegisterController;
