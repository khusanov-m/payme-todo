import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, take, takeUntil } from 'rxjs';
import { destroyFn } from 'src/app/services/destroy.service';
import { HttpService } from 'src/app/services/http.service';
import { ErrorHandlerService } from './../../services/error-handler.service';
import { getAllTodos } from './store/todos.actions';
import { TodoDataRequest, TodoItem, TodosResponse } from './todo.types';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _destroy = destroyFn();
  public constructor(
    private _http: HttpService,
    private _errHandler: ErrorHandlerService,
    private _toastr: ToastrService,
    private _router: Router,
    private store: Store
  ) {}

  public getAllTodos(): Observable<TodoItem[]> {
    return this._http.get<TodosResponse>('/todo/').pipe(
      map(res => res.results),
      take(1),
      catchError(error => this._errHandler.handleError(error))
    );
  }

  public getTodoById(id: string): Observable<TodoItem> {
    return this._http.get<TodoItem>(`/todo/${id}`).pipe(
      take(1),
      catchError(error => this._errHandler.handleError(error))
    );
  }

  public addTodo(todo: TodoDataRequest): Observable<TodoItem> {
    return this._http.post<TodoItem, TodoDataRequest>('/todo/', todo).pipe(
      take(1),
      catchError(error => this._errHandler.handleError(error))
    );
  }

  public editTodo(todo: TodoDataRequest, id: string): Observable<TodoItem> {
    return this._http.put<TodoItem, TodoDataRequest>(`/todo/${id}/`, todo).pipe(
      take(1),
      catchError(error => this._errHandler.handleError(error))
    );
  }

  public deleteTodo(id: string): void {
    if (!id) {
      this._toastr.error('No id provided');
      return;
    }

    this._http
      .delete(`/todo/${id}/`)
      .pipe(take(1), takeUntil(this._destroy))
      .subscribe({
        next: res => {
          console.log(res);
          this._toastr.success('Todo deleted successfully');
          this._router.navigate(['/app/todos']);
          this.store.dispatch(getAllTodos());
        },
        error: err => this._toastr.error(err.message),
      });
  }
}
