import { createReducer, on } from '@ngrx/store';
import { TodoItem } from '../todo.types';
import * as TodosActions from './todos.actions';

export type TodosState = {
  todos: TodoItem[];
  todo: TodoItem | null;
};

const initialState: TodosState = {
  todos: [],
  todo: null,
};

export const todosReducer = createReducer<TodosState>(
  initialState,

  on(
    TodosActions.setAllTodos,
    (state, { todos }): TodosState => ({
      ...state,
      todos,
    })
  ),

  on(
    TodosActions.setTodo,
    (state, { todo }): TodosState => ({
      ...state,
      todo,
    })
  )
);
