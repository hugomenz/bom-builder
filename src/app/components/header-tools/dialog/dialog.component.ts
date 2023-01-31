import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormMetadataComponent } from '../form-metadata/form-metadata.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  openMetadataForm(): void {
    this.dialog.open(FormMetadataComponent, {
      width: '600px',
    });
  }
}
