import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    name:string;
    email:string;
    profilePic?:string;
    gender?:string;
    phone?:string
};


interface UserState {
    user: User | null;
}


const storedUser = localStorage.getItem("user");
const initialState: UserState = storedUser ? JSON.parse(storedUser) : { user: null };

const userSlice = createSlice({
    name:"user",
    initialState,

    reducers:{
        setUser(state ,action:PayloadAction<User>){
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(state));
        },
        updateUser(state, action: PayloadAction<Partial<User>>) {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem("user", JSON.stringify(state));
            }
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem("user");
        }
    
    }
});



export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;