import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ui-todo',
  standalone: true,
  imports: [],
  templateUrl: './ui-todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTodoComponent {}
