import { createSlice } from "@reduxjs/toolkit";


const initialState={
    poto:""
};


const profileSlice=createSlice({
    name:"profile",
    initialState,
    reducers:{
        setpotoProfil:(state,action)=>{
            state.photo=action.payload.photo;
        },

        deletpotoProfil:(state)=>{
            state.photo=null;
        }

    }
})

export const {setpotoProfil ,deletpotoProfil }=profileSlice.actions;
export const selectUserPhoto = state=> state.profile.photo;

export default profileSlice.reducer

