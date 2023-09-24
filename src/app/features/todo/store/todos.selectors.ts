import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoItem } from '../todo.types';
import { TodosState } from './todos.reducer';

// export const getTodos = (state: RootState) => state.todo.todos;
// export const getTodo = (state: RootState) => state.todo.todos;

const selectTodosState = createFeatureSelector<TodosState>('todo');
const getTodos = (state: TodosState): TodoItem[] => state.todos;
export const selectTodos = createSelector(selectTodosState, getTodos);

const selectTodoState = createFeatureSelector<TodosState>('todo');
const getTodo = (state: TodosState): TodoItem | null => state.todo;
export const selectTodo = createSelector(selectTodoState, getTodo);
