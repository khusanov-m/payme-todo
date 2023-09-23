import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
