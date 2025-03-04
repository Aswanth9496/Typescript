import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface User {
    name: string;
    email: string;
}

interface AuthState {
    user: User | null,
    isLoggedIn:boolean,

}

const initialState:AuthState = {
    user:null,
    isLoggedIn:false
}






const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login(state, action:PayloadAction<{name: string, email: string}>){
          state.user={name:action.payload.name, email:action.payload.email};
          state.isLoggedIn = true
        },
        logOut(state){
            state.user = null;
            state.isLoggedIn = false;
        }
    }
});


 export const { login , logOut} = authSlice.actions ;

export default authSlice.reducer;