import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { from, map, Observable } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  headerList!: string[];

  data: Item[] = [] as Item[];
  dataEmpty: boolean = true;

  constructor(private papa: Papa) {}

  checkFileType(file: any): boolean {
    return file.type === 'text/csv';
  }

  checkFileHeader(data: any): boolean {
    return Object.keys(data[0]).length === 6;
  }

  csvParser(files: any): Promise<Item[]> {
    // onload needs a little bit to load the data it has to be async
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      if (!this.checkFileType(files)) {
        reject(new Error('Invalid file type'));
        return;
      }

      reader.onload = () => {
        this.papa.parse(reader.result as string, {
          complete: (result) => {
            if (!this.checkFileHeader(result.data)) {
              reject(new Error('Invalid file header'));
              return;
            }

            this.data = [];

            this.headerList = result.data.slice(0, 1);
            // skip position 0 for headers
            result.data.slice(1, -1).map((element: string[]) => {
              this.data.push({
                pos: element[0],
                code: element[1],
                desc1: element[2],
                desc2: element[3],
                dimension: element[4],
                quantity: element[5],
              });
            });
            this.dataEmpty = false;
            resolve(this.data);
          },
        });
      };
      reader.readAsText(files);
    });
  }
}
