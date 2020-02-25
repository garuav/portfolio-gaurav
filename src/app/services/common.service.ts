import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  getLocalStorageObj(key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  }
  setLocalStorageObj(key: string, value: any) {
    console.log('key = ', key, ' value = ', JSON.stringify(value));
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
