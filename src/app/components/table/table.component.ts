import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
import { DataService } from 'src/app/core/services/data.service';
import { LocalStorageService } from 'src/app/core/services/localstorage.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TableComponent implements OnChanges {
  //, OnInit {
  mainCsvData: any;
  dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>([]);
  displayedColumns = ['pos', 'code', 'desc1', 'desc2', 'dimension', 'quantity'];

  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: any | null;

  @Input() droppedFile!: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // mock file variables block
  //@Input() data!: any;
  //
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++

  constructor(
    public csv: CsvService,
    private _storage: LocalStorageService,
    public _data: DataService
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // MOCKED FILE BLOCK
  //
  /*   ngOnInit(): void {
    this.getMockedData();
  }

  getMockedData() {
    this.mainCsvData = this.data;
    this.dataSource = new MatTableDataSource<Item>(this.mainCsvData);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  } */
  //
  //MOCKED FILE BLOCK
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getData(files: any) {
    this.csv.csvParser(files).then((result) => {
      this.mainCsvData = result;
      this._data.saveTableData(this.mainCsvData); // to general service
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
    } else if (changes['dataSource']) {
      this.getData(this.droppedFile);
    }
  }
}
