import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { UiConfirmDialogComponent } from 'src/app/components/ui/ui-confirm-dialog/ui-confirm-dialog.component';
import { UiTodoComponent } from 'src/app/components/ui/ui-todo/ui-todo.component';
import { TodoService } from '../todo.service';
import { TodoItem } from '../todo.types';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    UiTodoComponent,
    RouterLink,
    NgIconComponent,
    MatRippleModule,
    MatDialogModule,
  ],
  templateUrl: './todo-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ heroTrash, heroPencilSquare })],
})
export class TodoItemComponent {
  private _destroy = inject(DestroyRef);
  public todo: TodoItem | undefined = this._route.snapshot.data['todo'];

  public constructor(
    private _route: ActivatedRoute,
    private _todo: TodoService,
    private _dialog: MatDialog
  ) {}

  private deleteTodo(): void {
    this._todo.deleteTodo(this.todo?.id || '');
  }

  public openDialog(): void {
    const dialog = this._dialog.open(UiConfirmDialogComponent);
    dialog
      .afterClosed()
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe(agree => {
        if (agree) {
          this.deleteTodo();
        }
      });
  }
}
