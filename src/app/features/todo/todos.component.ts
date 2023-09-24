import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from 'src/app/components/layout/header/header.component';
import { SidenavComponent } from 'src/app/components/layout/sidenav/sidenav.component';
import { getAllTodos } from './store/todos.actions';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidenavComponent],
  template: ` <div
    class="grid grid-cols-[4rem,1fr] grid-rows-[auto,1fr] h-full bg-amber-50">
    <app-header />

    <app-sidenav class="row-span-full" />

    <main class="overflow-y-auto">
      <router-outlet></router-outlet>
    </main>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getAllTodos());
  }
}
