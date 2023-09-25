import { createReducer, on } from '@ngrx/store';
import { TodoItem } from '../todo.types';
import * as TodosActions from './todos.actions';

export type TodosState = {
  todos: TodoItem[];
  todo: TodoItem | null;
  error: string;
};

const initialState: TodosState = {
  todos: [],
  todo: null,
  error: '',
};

export const todosReducer = createReducer<TodosState>(
  initialState,

  on(
    TodosActions.setAllTodos,
    (state, { todos }): TodosState => ({
      ...state,
      todos,
      error: '',
    })
  ),

  on(
    TodosActions.setTodo,
    (state, { todo }): TodosState => ({
      ...state,
      todo,
      error: '',
    })
  ),

  on(
    TodosActions.setError,
    (state, { error }): TodosState => ({
      ...state,
      error,
    })
  ),

  on(
    TodosActions.deleteTodo,
    (state, { id }): TodosState => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== id),
      error: '',
    })
  ),

  on(
    TodosActions.addTodo,
    (state, { todo }): TodosState => ({
      ...state,
      todos: [...state.todos, todo],
      error: '',
    })
  ),

  on(
    TodosActions.setUpdatedTodo,
    (state, { todo, id }): TodosState => ({
      ...state,
      todos: state.todos.map(t => (t.id === id ? todo : t)),
      error: '',
    })
  ),

  on(
    TodosActions.getTodoById,
    (state): TodosState => ({
      ...state,
      todo: null,
    })
  ),

  on(
    TodosActions.removeTodo,
    (state, { id }): TodosState => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== id),
      todo: null,
      error: '',
    })
  )
);
