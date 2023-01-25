import { Component, ViewChild } from '@angular/core';
import { Item } from '../core/interfaces/item';
import { CsvService } from '../core/services/csv.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss'],
})
export class MainCardComponent {
  mainCsvData: any;
  dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>([]);
  displayedColumns = ['pos', 'code', 'desc1', 'desc2', 'dimension', 'quantity'];

  constructor(public csv: CsvService, private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort!: MatSort;

  sortColumn(sort: Sort) {
    if (sort.direction) {
      this.dataSource.sort = this.sort;
    }
  }

  // dataSource changes when column name clicked
  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.mainCsvData);
  }

  onFileDropped(event: any) {
    const files = event.target.files[0];

    this.csv.csvParser(files).then((result) => {
      this.mainCsvData = result;
      this.dataSource = new MatTableDataSource<Item>(this.mainCsvData);
      this.dataSource.sort = this.sort;
    });
  }

  onButtonPaste() {}
}
