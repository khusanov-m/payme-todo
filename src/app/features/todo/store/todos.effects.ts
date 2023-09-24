import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
import { TodoService } from '../todo.service';
import * as TodosActions from './todos.actions';

@Injectable()
export class TodosEffects {
  constructor(
    private _actions$: Actions,
    private _todo: TodoService,
    private _toastr: ToastrService
  ) {}

  getAllTodos$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(TodosActions.getAllTodos),
      exhaustMap(() =>
        this._todo.getAllTodos().pipe(
          map(todos => TodosActions.setAllTodos({ todos })),
          catchError(error => {
            this._toastr.error(error.message);
            return EMPTY;
          })
        )
      )
    );
  });

  getTodoById$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(TodosActions.getTodoById),
      exhaustMap(({ id }) =>
        this._todo.getTodoById(id).pipe(
          map(todo => TodosActions.setTodo({ todo })),
          catchError(error => {
            this._toastr.error(error.message);
            return EMPTY;
          })
        )
      )
    );
  });
}
