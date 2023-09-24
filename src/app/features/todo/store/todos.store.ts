import { ActionReducerMap } from '@ngrx/store';

import { TodosState, todosReducer } from './todos.reducer';

export type RootState = {
  todo: TodosState;
};

export const reducers: ActionReducerMap<RootState> = {
  todo: todosReducer,
};
