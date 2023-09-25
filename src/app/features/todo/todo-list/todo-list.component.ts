import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlusCircle } from '@ng-icons/heroicons/outline';
import { Store } from '@ngrx/store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Observable } from 'rxjs';

import { UiConfirmDialogComponent } from 'src/app/components/ui/ui-confirm-dialog/ui-confirm-dialog.component';
import { UiTodoComponent } from 'src/app/components/ui/ui-todo/ui-todo.component';
import { AsyncLoadingPipe } from 'src/app/pipes/async-loading.pipe';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import * as TodosActions from '../store/todos.actions';
import { selectTodos } from '../store/todos.selectors';
import { TodoItem } from '../todo.types';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    MatChipsModule,
    NgIf,
    NgFor,
    AsyncPipe,
    AsyncLoadingPipe,
    UiTodoComponent,
    MatDialogModule,
    NgIconComponent,
    FilterPipe,
    RouterLink,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideIcons({
      heroPlusCircle,
    }),
  ],
})
export class TodoListComponent {
  private _destroy = inject(DestroyRef);
  public isLoading = true;
  public filterValue = '';
  public filterOptions = [
    {
      value: true,
      title: 'Completed',
      color: 'primary',
    },
    {
      value: false,
      title: 'In progress',
      color: 'accent',
    },
  ];

  public todos$: Observable<TodoItem[]>;

  public constructor(
    private readonly store: Store,
    private _router: Router,
    private _dialog: MatDialog,
    private _cdRef: ChangeDetectorRef
  ) {
    this.todos$ = this.store.select(selectTodos);
  }

  public onFilterChange(change: MatChipListboxChange): void {
    if (!change.value) {
      this.filterValue = '';
    } else {
      this.filterValue = change.value;
    }
  }

  public onActionTrigger({ type, id }: { type: string; id: string }): void {
    switch (type) {
      case 'edit':
        this.store.dispatch(TodosActions.getTodoById({ id }));
        this._router.navigate([`/app/todos/todo/${id}/edit`]);
        break;
      case 'delete':
        this.openDialog(id);
        break;
      default:
        break;
    }
  }

  private openDialog(id: string): void {
    const dialog = this._dialog.open(UiConfirmDialogComponent);

    dialog
      .afterClosed()
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe(agree => {
        if (agree) {
          this.store.dispatch(TodosActions.deleteTodo({ id }));
        }
      });
  }
}
