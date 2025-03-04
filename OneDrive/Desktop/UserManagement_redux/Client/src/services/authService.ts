
import axios from "axios";


const API = axios.create({baseURL:"http://localhost:5000/api/auth"});

export const registerUser = (userData:{name:string,email:string,password:string})=>{ 
    return API.post("/register",userData)
};

export const loginUser = (userData: { email: string; password: string }) => {
    return API.post("/login", userData)
};
