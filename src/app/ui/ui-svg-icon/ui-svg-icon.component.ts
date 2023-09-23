import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ui-svg-icon',
  standalone: true,
  imports: [],
  templateUrl: './ui-svg-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSvgIconComponent {}
