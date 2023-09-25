import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroEye, heroEyeSlash } from '@ng-icons/heroicons/outline';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';
import { LoginRequest } from './auth.types';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    NgIconComponent,
    NgIf,
  ],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ heroEyeSlash, heroEye })],
})
export class AuthComponent implements OnInit {
  private _destroy = inject(DestroyRef);
  public hide = false;
  public authForm = this._fb.nonNullable.group({
    email: ['nurlan@payme.uz', [Validators.required, Validators.email]],
    password: ['12345678', [Validators.required]],
  });

  public constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _router: Router,
    private _cookie: CookieService
  ) {}

  public ngOnInit(): void {
    const isAuthenticated = this._cookie.check('token');
    if (isAuthenticated) this._router.navigate(['/app/todos']);
  }

  public onSubmit() {
    if (this.authForm.invalid) return;

    if (this.authForm.valid && this.isTodoFormValid(this.authForm.value))
      this._auth
        .login(this.authForm.value)
        .pipe(takeUntilDestroyed(this._destroy))
        .subscribe({
          next: user => {
            this._router.navigate(['/app/todos']);
            this._toastr.success(`Welcome back ${user.username}!`);
          },
          error: (err: HttpErrorResponse) => this._toastr.error(err.message),
        });
  }

  private isTodoFormValid(data: Partial<LoginRequest>): data is LoginRequest {
    return 'email' in data && 'password' in data;
  }

  public getErrorMessage(field: string) {
    if (this.authForm.get(field)?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.authForm.get(field)?.hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
