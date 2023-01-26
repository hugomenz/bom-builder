import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from 'src/app/core/interfaces/item';
import { CsvService } from 'src/app/core/services/csv.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  mainCsvData: any;
  dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>([]);
  displayedColumns = ['pos', 'code', 'desc1', 'desc2', 'dimension', 'quantity'];

  @Input() droppedFile!: any;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public csv: CsvService) {}

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['droppedFile']) {
      this.getData(changes['droppedFile'].currentValue);
    }
  }
}
