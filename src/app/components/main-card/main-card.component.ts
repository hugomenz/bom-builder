import { Component } from '@angular/core';
import { CsvService } from '../../core/services/csv.service';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss'],
})
export class MainCardComponent {
  droppedFile!: File | boolean; // boolean for test. It should be removed when "new List" is implemented

  constructor(public csv: CsvService) {}

  onFileDropped(event: any) {
    this.droppedFile = event.target.files[0];
  }

  onButtonPaste() {}
}