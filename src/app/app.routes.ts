import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/todos',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth.component').then(m => m.AuthComponent),
    title: 'Login',
  },
  {
    path: 'app/todos',
    loadComponent: () =>
      import('./features/todo/todos.component').then(m => m.TodosComponent),
    loadChildren: () =>
      import('./features/todo/todo.routes').then(m => m.TODOS_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        m => m.NotFoundComponent
      ),
    title: '404 Not Found',
  },
];
