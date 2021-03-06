import { createSlice } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    value: [
      {name: "learn redux", completed: false},
      {name: "record video", completed: true},
      {name: "post video", completed: false},
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      // Redux Toolkit allows us to 'mutate' the state. It doesn't actually
      // mutate the state because it uses the immer library, which detects
      // changes to a "draft state" and produces a brand new immutable state
      // based off those changes
      state.value.push({name: action.payload.name, completed: false})
    },
    completeTodo: (state, action) => {
      state.value[action.payload.index].completed = true;
    },
    deleteTo: (state, action) => {
      // Construct a new array immutably
      // state.saved = state.saved.filter(item => item.id !== action.payload)
      return state.value.filter((item,i) => item.completed !== action.payload)
      // "Mutate" the existing state to save the new array
      //  = state.payload.newSaved
  }
  },
});

export const selectTodos = state => state.todos.value;
export const { addTodo, removeTodo ,deleteTo} = todosSlice.actions;

export default todosSlice.reducer;