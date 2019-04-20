import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /* #region [LocalStorage] */
  public setItemToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getItemFromLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }

  public removeItemFromLocalStorage(key: string)  {
    localStorage.removeItem(key);
  }
  /* #endregion */

  /* #region [SesionStorage] */
  public setItemToSessionStorage(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  public getItemFromSessionStorage(key: string): string {
    return sessionStorage.getItem(key);
  }

  public removeItemFromSessionStorage(key: string)  {
    sessionStorage.removeItem(key);
  }
  /* #endregion */

}
