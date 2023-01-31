import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ListInfo } from 'src/app/models/list-info';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dataChange: Subject<ListInfo> = new Subject<ListInfo>();

  data = {
    tableInfo: {} as ListInfo,
    tableData: {},
    userData: {},
  };

  constructor() {
    this.dataChange.subscribe((value) => {
      this.data.tableInfo = value;
    });
  }

  saveTableInfo(newTableInfo: any) {
    this.dataChange.next(newTableInfo);
  }

  saveTableData(newTableData: any) {
    this.data = {
      ...this.data,
      tableData: newTableData,
    };
  }

  saveUserData(newUserData: any) {
    this.data = {
      ...this.data,
      userData: newUserData,
    };
  }

  saveListToApi() {
    // API PUT
  }
}
