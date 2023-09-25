import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './features/auth/auth.service';
import { selectError } from './features/todo/store/todos.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public title = 'payme-todo';
  private _destroy = inject(DestroyRef);

  public constructor(
    private readonly store: Store,
    private _auth: AuthService,
    private _toastr: ToastrService
  ) {
    const error = this.store.select(selectError);
    error.pipe(takeUntilDestroyed(this._destroy)).subscribe({
      next: error => {
        if (error) {
          this._toastr.error(error);
        }
      },
    });
  }

  public ngOnInit(): void {
    this._auth.autoLogin();
  }
}
