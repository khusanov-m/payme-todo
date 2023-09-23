import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {}
