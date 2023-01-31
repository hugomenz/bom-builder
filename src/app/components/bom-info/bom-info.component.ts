import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ListInfo } from 'src/app/models/list-info';

@Component({
  selector: 'app-bom-info',
  templateUrl: './bom-info.component.html',
  styleUrls: ['./bom-info.component.scss'],
})
export class BomInfoComponent implements OnInit {
  public data: ListInfo = {} as ListInfo;

  constructor(public _data: DataService) {}

  ngOnInit(): void {
    this._data.dataChange.subscribe((value) => {
      this.data = value;
    });
  }
}
