import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroCheckBadge,
  heroEllipsisHorizontalCircle,
  heroPencil,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import { TodoItem } from 'src/app/features/todo/todo.types';

@Component({
  selector: 'app-ui-todo',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    DatePipe,
    NgIconComponent,
    MatMenuModule,
    RouterLink,
    MatRippleModule,
  ],
  templateUrl: './ui-todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      heroPencil,
      heroTrash,
      heroEllipsisHorizontalCircle,
      heroCheckBadge,
    }),
  ],
})
export class UiTodoComponent {
  @Input({ required: true }) public todo: TodoItem | undefined;
  @Input({ required: true }) public showMenu = false;
  @Input({ required: true }) public showDetails = false;
  @Output() public action = new EventEmitter<{
    type: string;
    id: string;
  }>();

  public menuItems = [
    {
      title: 'edit',
      icon: 'heroPencil',
      action: () => this.action.emit({ type: 'edit', id: this.todo?.id || '' }),
    },
    {
      title: 'delete',
      icon: 'heroTrash',
      action: () =>
        this.action.emit({ type: 'delete', id: this.todo?.id || '' }),
    },
  ];
}
