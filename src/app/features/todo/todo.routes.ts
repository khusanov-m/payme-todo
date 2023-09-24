import { Routes } from '@angular/router';

export const TODOS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./todo-list/todo-list.component').then(m => m.TodoListComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./todo-form/todo-form.component').then(m => m.TodoFormComponent),
  },
  {
    path: 'todo/:id',
    loadComponent: () =>
      import('./todo-item/todo-item.component').then(m => m.TodoItemComponent),
    // Implementing a resolver
    // resolve: { todo: TodoResolver },
  },
  {
    path: 'todo/:id/edit',
    loadComponent: () =>
      import('./todo-form/todo-form.component').then(m => m.TodoFormComponent),
    // Implementing a resolver
    // resolve: { todo: TodoResolver },
  },
];
