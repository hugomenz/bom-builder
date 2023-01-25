import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from '../core/interfaces/item';
import { CsvService } from '../core/services/csv.service';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss'],
})
export class MainCardComponent implements OnInit {
  testdata: any;
  dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>([]);
  displayedColumns = ['id', 'code', 'desc1', 'desc2', 'dimension', 'quantity'];
  constructor(public csv: CsvService) {}

  ngOnInit() {}

  onFileDropped(event: any) {
    const files = event.target.files[0];

    this.csv
      .csvParser(files)
      .then(
        (result) => (this.dataSource = new MatTableDataSource<Item>(result))
      );
  }

  onButtonPaste() {}
}
