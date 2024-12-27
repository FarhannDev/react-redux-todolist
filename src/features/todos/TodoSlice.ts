import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoState } from '../../interfaces/todo';
import { nanoid } from 'nanoid'
import { hasLocalStorage, removeLocalStorage, setLocalStorage } from '../../utils/localStorage';
import { RootState } from '../../app/store';

const initialState: TodoState = {
  todos: hasLocalStorage('todos'), 
  filter: 'all',
  search: ''
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>): void => {
      const { text, category, dueDate } = action.payload;
      const newTodo: Todo = {
        id: nanoid(),
        text,
        completed: false,
        priority: false,
        category,
        dueDate,
      }
      state.todos.push(newTodo);
      setLocalStorage('todos', state.todos);
    },
    toggleTodo: (state, action: PayloadAction<Todo>): void => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);

      if(todo) {
        todo.completed = !todo.completed
        setLocalStorage('todos', state.todos) 
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) : void => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      const { text } = action.payload
    
      if(todo) {
          todo.text = text;
          setLocalStorage('todos', state.todos);
      }
    },
    deleteTodo: (state, action: PayloadAction<Todo>) : void => {
      const todo = state.todos.filter((todo) => todo.id !== action.payload.id);
      
      removeLocalStorage('todos', todo);
    },
    deleteAllTodo: (state) => {
      state.todos = [];
      setLocalStorage('todos', state.todos);
    },
    filterTodo: (state, action: PayloadAction<'all' | 'completed' | 'pending'>): void => {
      switch (action.payload) {
        case 'completed':
          state.todos = state.todos.filter((todo) => todo.completed);
          break;
        case 'pending':
          state.todos = state.todos.filter((todo) => !todo.completed);
          break;
        default:
          state.todos = [...state.todos]; 
          break;
      }
    },  
    searchTodo: (state, action: PayloadAction<string>): void => {
      const searchTerm = action.payload.toLowerCase();
      state.todos = state.todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchTerm)
      );
    }
  }
});

export const {
    addTodo, 
    updateTodo,
    deleteTodo, 
    deleteAllTodo,
    toggleTodo, 
    filterTodo, 
    searchTodo
  } = todoSlice.actions;

export const selectCount = (state: RootState) => state.todo.todos;


export default todoSlice.reducer;

