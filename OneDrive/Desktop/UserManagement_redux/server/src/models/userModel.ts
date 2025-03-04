import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    image?: string;
    isAdmin?: boolean;
    mobile?: Number;
    gender?:string
}

const userSchema = new Schema<IUser>({
    name: {
         type: String, required: true
         },
    email: {
         type: String, required: true, unique: true 
        },
    password: {
         type: String, required: true 
        },
    image: { 
        type: String, default: null 
    },
    isAdmin: { 
        type: Boolean, default: false 
    },
    mobile: { 
        type: Number, default: false 
    },
    gender:{
        type: String, default: null
    }
   
});

export default mongoose.model<IUser>("User", userSchema);
