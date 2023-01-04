import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss'],
})
export class MainCardComponent implements OnInit, OnDestroy {
  dragDropSubject: Subject<File[]> = new Subject<File[]>();

  constructor(private papa: Papa) {}

  // init
  ngOnInit() {
    this.dragDropSubject.subscribe((data) => {
      console.log(data);
    });
  }

  onFileDropped(event: any) {
    const files = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.papa.parse(reader.result as string, {
        complete: (result) => {
          result.data.map((element: any) => console.log(element));
        },
      });
    };

    reader.readAsText(files);
  }

  onButtonPaste() {}

  // destroy
  ngOnDestroy() {}
}
