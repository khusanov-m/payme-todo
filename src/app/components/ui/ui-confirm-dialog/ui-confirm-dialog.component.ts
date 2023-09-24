import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ui-confirm-dialog',
  standalone: true,
  imports: [MatRippleModule],
  templateUrl: './ui-confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<UiConfirmDialogComponent>) {}
}
