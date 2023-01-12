import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from '../core/interfaces/item';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss'],
})
export class MainCardComponent implements OnInit {
  data: Item[] = [] as Item[];

  dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>([]);
  dataEmpty: boolean = true;

  displayedColumns = ['id', 'code', 'desc1', 'desc2', 'dimension', 'quantity'];
  constructor(private papa: Papa) {}

  ngOnInit() {}

  onFileDropped(event: any) {
    const files = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.papa.parse(reader.result as string, {
        complete: (result) => {
          this.data = [];
          result.data.slice(1, -1).map((element: string[]) =>
            this.data.push({
              id: element[0],
              code: element[1],
              desc1: element[2],
              desc2: element[3],
              dimension: element[4],
              quantity: element[5],
            })
          );
          console.log(this.data);
          this.dataEmpty = false;

          this.dataSource = new MatTableDataSource<Item>(this.data);
        },
      });
    };
    reader.readAsText(files);
  }

  parseText(event: any) {
    this.onFileDropped(event);
  }

  onButtonPaste() {}
}
