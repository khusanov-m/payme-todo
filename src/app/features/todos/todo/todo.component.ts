import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {}
