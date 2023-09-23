import { Routes } from '@angular/router';

export const TODOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./todos.component').then(m => m.TodosComponent),
  },
  {
    path: 'form',
    loadComponent: () =>
      import('./form/form.component').then(m => m.FormComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./todo/todo.component').then(m => m.TodoComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./form/form.component').then(m => m.FormComponent),
  },
];
