import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, take } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { TodoDataRequest, TodoItem, TodosResponse } from './todo.types';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public constructor(
    private _http: HttpService,
    private _toastr: ToastrService
  ) {}

  public getAllTodos(): Observable<TodoItem[]> {
    return this._http.get<TodosResponse>('/todo/').pipe(
      map(res => res.results),
      take(1)
    );
  }

  public getTodoById(id: string): Observable<TodoItem> {
    return this._http.get<TodoItem>(`/todo/${id}`).pipe(take(1));
  }

  public addTodo(todo: TodoDataRequest): Observable<TodoItem> {
    return this._http
      .post<TodoItem, TodoDataRequest>('/todo/', todo)
      .pipe(take(1));
  }

  public editTodo(todo: TodoDataRequest, id: string): Observable<TodoItem> {
    return this._http
      .put<TodoItem, TodoDataRequest>(`/todo/${id}/`, todo)
      .pipe(take(1));
  }

  public deleteTodo(id: string): Observable<unknown> {
    if (!id) {
      this._toastr.error('No id provided');
    }
    return this._http.delete(`/todo/${id}/`).pipe(take(1));
  }
}
