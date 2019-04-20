import { Injectable } from '@angular/core';
import { UserToRegister } from './../../../dtos/auth/UserToRegister';
import { UserToLogin } from './../../../dtos/auth/UserToLogin';
import { Observable } from 'rxjs/internal/Observable';
import { Token } from 'src/app/models/auth/token';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from './../../storage/storage.service';
import { AuthDataService } from 'src/app/services/auth/data/auth-data.service';
import { BehaviorSubject, of } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { ErrorNotificationComponent } from 'src/shared/notifications/error-notification/error-notification.component';

@Injectable({
  providedIn: 'root'
})
export class AuthLogicService {

  /* #region [PrivateProperties] */
  private _username: BehaviorSubject<string> = new BehaviorSubject<string>('');
  /* #endregion */

  /* #region [PublicMethods] */
  constructor(
    private _authDataService: AuthDataService,
    private _storageService: StorageService,
    private _matSnackBar: MatSnackBar
  ) { }

  public login(userToLogin: UserToLogin): void {
    this._authDataService.login(userToLogin).subscribe((response: Token) => {
      this._storageService.setItemToLocalStorage('token', response.token);
      this._storageService.setItemToLocalStorage('username', userToLogin.username);
      this._setUsername(userToLogin.username);
    }, (error: HttpErrorResponse) => {
      this._matSnackBar.openFromComponent(ErrorNotificationComponent, { data: error.message });
    });
  }

  public logout(): void {
    this._storageService.removeItemFromLocalStorage('token');
  }

  public loggedIn(): boolean {
    const token = this._storageService.getItemFromLocalStorage('token');
    return !!token;
  }

  public register(userToRegister: UserToRegister): void {
    this._authDataService.register(userToRegister).subscribe((response: UserToRegister) => {
      const user: UserToLogin = {
        username: userToRegister.username,
        password: userToRegister.password
      } as UserToLogin;
      this.login(user);
      this._setUsername(user.username);
    }, (error: HttpErrorResponse) => {
      console.log(error.error);
      let errorMessage: '';
      error.error.Password.length > 0 ? error.error.Password.map(value => errorMessage += value + '\n') : errorMessage += '';
      error.error.Username.length > 0 ? error.error.Username.map(value => errorMessage += value + '\n') : errorMessage += '';
      console.log(errorMessage);
      this._matSnackBar.openFromComponent(ErrorNotificationComponent, { data: errorMessage });
    });
  }

  public getUsername(): Observable<string> {
    return this._username.asObservable();
  }

  public getUsernameFromStorage(): string {
    return this._storageService.getItemFromLocalStorage('username');
  }
  /* #endregion */

  /* #region [PrivateMethods] */
  private _setUsername(value: string): void {
    this._username.next(value);
  }
  /* #endregion */
}
