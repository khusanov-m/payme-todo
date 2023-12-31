import { createAction, props } from '@ngrx/store';
import { TodoDataRequest, TodoItem } from '../todo.types';

export const setAllTodos = createAction(
  '[Todos] Set Todos',
  props<{ todos: TodoItem[] }>()
);
export const setTodo = createAction(
  '[Todos] Set Todo',
  props<{ todo: TodoItem | null }>()
);
export const setError = createAction(
  '[Todos] Set Error',
  props<{ error: string }>()
);
export const setUpdatedTodo = createAction(
  '[Todos] Set Edit Todo',
  props<{ todo: TodoItem; id: string }>()
);
export const removeTodo = createAction(
  '[Todos] Remove Todo',
  props<{ id: string }>()
);

export const getAllTodos = createAction('[Todos] Get Todos');
export const getTodoById = createAction(
  '[Todos] Get Todo By Id',
  props<{ id: string }>()
);

export const addTodo = createAction(
  '[Todos] Add Todo',
  props<{ todo: TodoDataRequest }>()
);

export const editTodo = createAction(
  '[Todos] Edit Todo',
  props<{ todo: TodoDataRequest; id: string }>()
);

export const deleteTodo = createAction(
  '[Todos] Delete Todo',
  props<{ id: string }>()
);
