import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { TodoService } from '../todo.service';
import { TodoItem } from '../todo.types';

export const TodoResolver: ResolveFn<TodoItem | null> = (
  route: ActivatedRouteSnapshot
): Observable<TodoItem | null> => {
  const todo = inject(TodoService);

  return todo.getTodoById(route.params['id']);
};
