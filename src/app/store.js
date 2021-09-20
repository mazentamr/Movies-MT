import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/user/userSlice"
import profileReducer from "../features/Profile/profileSlice"
import favoritReducer from "../features/FavoritR/favoritSlice"
import todosReducers from "../features/todo/todo"
import savedReducers from "../features/Saved/savedSlice"
const store = configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        favorit:favoritReducer,
        todos: todosReducers,
        saved:savedReducers
    }
})

export default store
