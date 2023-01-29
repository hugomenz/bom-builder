import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getItem(key: string): any {
    return localStorage.getItem(key);
  }

  setBool(key: string, value: boolean) {
    localStorage.setItem(key, String(value));
  }

  getBool(key: string): boolean {
    return localStorage.getItem(key) === 'true';
  }

  setObject(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getObject(key: string) {
    if (localStorage.getItem(key) != null) {
      return JSON.parse(localStorage.getItem(key) as any);
    }
  }
}
