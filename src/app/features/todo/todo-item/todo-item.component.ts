import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import { Store } from '@ngrx/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { UiConfirmDialogComponent } from 'src/app/components/ui/ui-confirm-dialog/ui-confirm-dialog.component';
import { UiTodoComponent } from 'src/app/components/ui/ui-todo/ui-todo.component';
import * as TodosActions from '../store/todos.actions';
import { selectTodo } from '../store/todos.selectors';
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
    NgxSkeletonLoaderModule,
    NgIf,
  ],
  templateUrl: './todo-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ heroTrash, heroPencilSquare })],
})
export class TodoItemComponent {
  private _destroy = inject(DestroyRef);
  public isLoading = true;
  public todo: TodoItem | undefined;
  // for Resolver approach
  // public todo: TodoItem | undefined = this._route.snapshot.data['todo'];

  public constructor(
    private readonly store: Store,
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _cdRef: ChangeDetectorRef
  ) {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(TodosActions.getTodoById({ id }));
      const todo = this.store.select(selectTodo);
      todo.pipe(takeUntilDestroyed(this._destroy)).subscribe({
        next: todo => {
          if (todo) {
            this.todo = todo;
            this.isLoading = false;
            this._cdRef.markForCheck();
          }
        },
      });
    }
  }

  private deleteTodo(): void {
    this.store.dispatch(TodosActions.deleteTodo({ id: this.todo?.id || '' }));
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
