import { Component, ViewChild } from '@angular/core';
import { Item } from '../core/interfaces/item';
import { CsvService } from '../core/services/csv.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss'],
})
export class MainCardComponent {
  mainCsvData: any;
  dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>([]);
  displayedColumns = ['pos', 'code', 'desc1', 'desc2', 'dimension', 'quantity'];

  droppedFile!: any;

  constructor(public csv: CsvService) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getData(files: any) {
    this.csv.csvParser(files).then((result) => {
      this.mainCsvData = result;

      this.dataSource = new MatTableDataSource<Item>(this.mainCsvData);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  onFileDropped(event: any) {
    this.droppedFile = event.target.files[0];
    this.getData(this.droppedFile);
  }

  onButtonPaste() {}
}
