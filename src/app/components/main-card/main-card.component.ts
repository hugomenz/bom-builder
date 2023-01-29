import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/localstorage.service';
import { CsvService } from '../../core/services/csv.service';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss'],
})
export class MainCardComponent {
  //implements OnInit {
  spinner = false;

  droppedFile!: File | boolean; // boolean for test. It should be removed when "new List" is implemented
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // mocked file variables
  //mockedFileData: any;
  //
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  constructor(
    public csv: CsvService,
    private _storage: LocalStorageService // mocking file service
  ) {}

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // - delete implements OnInit
  // - delete input directive html component
  // mocking file block
  /*   ngOnInit() {
    let dataFromStorage = this._storage.getObject('droppedFile');
    if (Object.keys(dataFromStorage).length > 0) {
      this.mockedFileData = dataFromStorage;
    }
  } */
  //
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++

  onFileDropped(event: any) {
    this.spinner = true;

    setTimeout(() => {
      this.spinner = false;
      this.droppedFile = event.target.files[0];
    }, 400);
  }

  onButtonPaste() {}
}
