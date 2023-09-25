import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { TodoService } from '../todo.service';
import * as TodosActions from './todos.actions';

@Injectable()
export class TodosEffects {
  constructor(
    private _actions$: Actions,
    private _todo: TodoService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}

  getAllTodos$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(TodosActions.getAllTodos),
      exhaustMap(() =>
        this._todo.getAllTodos().pipe(
          map(todos => TodosActions.setAllTodos({ todos })),
          catchError(error => of(TodosActions.setError({ error })))
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
          catchError(error => of(TodosActions.setError({ error })))
        )
      )
    );
  });

  addTodo$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(TodosActions.addTodo),
      exhaustMap(({ todo }) =>
        this._todo.addTodo(todo).pipe(
          map(() => TodosActions.setTodo({ todo: null })),
          tap(() => {
            this._toastr.success('Todo added successfully');
            this._router.navigate(['/app/todos']);
          }),
          catchError(error => of(TodosActions.setError({ error })))
        )
      )
    );
  });

  editTodo$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(TodosActions.editTodo),
      mergeMap(({ todo, id }) =>
        this._todo.editTodo(todo, id).pipe(
          map(() => TodosActions.setUpdatedTodo({ todo, id })),
          tap(() => {
            this._toastr.success('Todo updated successfully');
            this._router.navigate(['/app/todos']);
          }),
          catchError(error => of(TodosActions.setError({ error })))
        )
      )
    );
  });

  deleteTodo$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(TodosActions.deleteTodo),
      exhaustMap(({ id }) =>
        this._todo.deleteTodo(id).pipe(
          map(() => TodosActions.removeTodo({ id })),
          tap(() => {
            this._toastr.success('Todo deleted successfully');
            this._router.navigate(['/app/todos']);
          }),
          catchError(error => of(TodosActions.setError({ error })))
        )
      )
    );
  });
}
