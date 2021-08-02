import {createSlice} from "@reduxjs/toolkit"


const initialState={
    name:"",
    email:"",
    userId:""
}


const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{

        

        setUserLogin:(state,action)=>{
            state.name=action.payload.name;
            state.email=action.payload.email;
            state.userId=action.payload.userId;
           
        },

        setSignOut:(state)=>{
            state.name=null;
            state.email=null;
            state.userId=null;
            
        },

    }
})

export const {setUserLogin,setSignOut,setpotoProfil,deletpotoProfil} = userSlice.actions;

export const selectUserName = state=> state.user.name;
export const selectUserEmail = state=> state.user.email;
export const selectUserId = state=> state.user.userId;

export default userSlice.reducer