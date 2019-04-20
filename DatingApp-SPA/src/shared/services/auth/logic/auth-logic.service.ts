import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Token } from 'src/shared/models/auth/token';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AuthDataService } from '../data/auth-data.service';
import { StorageService } from '../../storage/storage.service';
import { UserToLogin } from 'src/shared/dtos/auth/UserToLogin';
import { UserToRegister } from 'src/shared/dtos/auth/UserToRegister';

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
    private _storageService: StorageService
  ) { }

  public login(userToLogin: UserToLogin): void {
    this._authDataService.login(userToLogin).subscribe((response: Token) => {
      this._storageService.setItemToLocalStorage('token', response.token);
      this._storageService.setItemToLocalStorage('username', userToLogin.username);
      this._setUsername(userToLogin.username);
    }, (error: HttpErrorResponse) => {
      console.log(error);
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
      console.log(error);
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
