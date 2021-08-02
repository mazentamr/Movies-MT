import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorit: [],
}

export const favoritSlice = createSlice({
    name: "favorit",
    initialState,
    reducers: {
        addFavorit: (state, action) => {
            state.favorit.push(action.payload)
        },
        addFavoritInFirestor:(state,action)=>{
            state.favorit=action.payload.favorit
        },
        deleteFavorit: (state, action) => {
            state.favorit.filter((item) => item.id != action.payload)
        }
    }
})

export const { addFavorit, deleteFavorit,addFavoritInFirestor } = favoritSlice.actions;
export const selectFavorit = state => state.favorit.favorit
export default favoritSlice.reducer


