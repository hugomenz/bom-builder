import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/core/services/data.service';
import { ListInfo } from 'src/app/models/list-info';

@Component({
  selector: 'app-form-metadata',
  templateUrl: './form-metadata.component.html',
  styleUrls: ['./form-metadata.component.scss'],
})
export class FormMetadataComponent {
  formData: ListInfo = {} as ListInfo;

  constructor(
    public dialogRef: MatDialogRef<FormMetadataComponent>,
    public _data: DataService
  ) {}

  onSubmit() {
    this._data.saveTableInfo(this.formData);
    console.log(this._data.data);
  }
}
