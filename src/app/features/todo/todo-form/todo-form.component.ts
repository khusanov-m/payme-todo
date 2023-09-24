import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { HttpErrorResponse } from '@angular/common/http';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { getAllTodos, getTodoById } from '../store/todos.actions';
import { selectTodo } from '../store/todos.selectors';
import { TodoService } from '../todo.service';
import { TodoDataRequest, TodoItem } from '../todo.types';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    NgIconComponent,
    MatCheckboxModule,
    NgIf,
  ],
  templateUrl: './todo-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  private _destroy = inject(DestroyRef);
  public todo: TodoItem | undefined;
  public isLoading = false;

  public todoForm = this._fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(10)]],
    completed: [false, [Validators.required]],
    user: [1],
  });

  public constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _todo: TodoService,
    private _router: Router,
    private _toastr: ToastrService,
    private readonly store: Store
  ) {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(getTodoById({ id }));
    }
    const todo = this.store.select(selectTodo);
    todo.pipe(takeUntilDestroyed(this._destroy)).subscribe({
      next: todo => {
        if (todo) {
          this.todo = todo;
          this.todoForm.patchValue(todo);
        }
      },
    });
  }

  public onSubmit(): void {
    if (this.todoForm.invalid) return;

    if (this.todo) {
      // EDIT TODO
      this.editTodo();
    } else {
      // ADD TODO
      this.addTodo();
    }
    this.todoForm.disable();
    this.isLoading = true;
  }

  private editTodo(): void {
    if (this.todo?.id && this.isTodoFormValid(this.todoForm.value)) {
      this._todo
        .editTodo(this.todoForm.value, this.todo.id)
        .pipe(takeUntilDestroyed(this._destroy))
        .subscribe({
          next: () => {
            this._router.navigate(['/app/todos']);
            this._toastr.success("Todo's been updated successfully!");
            this.store.dispatch(getAllTodos());
          },
          error: (err: HttpErrorResponse) => {
            this._toastr.error(err.message);
            this.todoForm.enable();
            this.isLoading = false;
          },
        });
    }
  }

  private addTodo(): void {
    if (this.isTodoFormValid(this.todoForm.value)) {
      this._todo
        .addTodo(this.todoForm.value)
        .pipe(takeUntilDestroyed(this._destroy))
        .subscribe({
          next: () => {
            this._router.navigate(['/app/todos']);
            this._toastr.success("Todo's been added successfully");
            this.store.dispatch(getAllTodos());
          },
          error: (err: HttpErrorResponse) => {
            this._toastr.error(err.message);
            this.todoForm.enable();
            this.isLoading = false;
          },
        });
    }
  }

  private isTodoFormValid(
    data: Partial<TodoDataRequest>
  ): data is TodoDataRequest {
    return 'title' in data && 'completed' in data && 'user' in data;
  }

  public getErrorMessage(field: string) {
    if (this.todoForm.get(field)?.hasError('required')) {
      return 'This field is required';
    }
    return this.todoForm.get(field)?.hasError('minlength')
      ? 'Min length is 10'
      : '';
  }

  public resetForm(): void {
    if (this.todo) {
      this.todoForm.patchValue(this.todo);
    } else {
      this.todoForm.reset();
    }
  }
}
