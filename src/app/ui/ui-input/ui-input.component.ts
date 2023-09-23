import {
  NgClass,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-ui-input',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgClass,
    NgxMaskDirective,
    NgIf,
  ],
  templateUrl: './ui-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input({ required: true }) type = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() class = '';
  @Input({ required: true }) for = '';
  @Input() mask = '';
  @Input({ required: true }) value = '';
  @Input() autocomplete = '';
  @Input() error = '';
  @Output() valueChange = new EventEmitter<Event>();
}
