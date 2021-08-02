import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    saved: [],
}

export const savedSlice = createSlice({
    name: "saved",
    initialState,
    reducers: {
        addSaved: (state, action) => {
            state.saved.push(action.payload)
        },
        addSavedInFirebase: (state, action) => {
            state.saved = action.payload.saved
        },
        deleteSaved: (state, action) => {
            state.saved.filter((item,i) => item.id != action.payload)
        }
    }
})

export const { addSaved, addSavedInFirebase,deleteSaved } = savedSlice.actions;
export const selectSaved = state => state.saved.saved
export default savedSlice.reducer   