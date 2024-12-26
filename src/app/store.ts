import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todos/TodoSlice'

const store = configureStore({
  reducer: {
    todo: todoReducer
  }
})

export default store;