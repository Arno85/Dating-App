import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Token } from 'src/shared/models/auth/token';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AuthDataService } from '../data/auth-data.service';
import { StorageService } from '../../storage/storage.service';
import { UserToLogin } from 'src/shared/dtos/auth/UserToLogin';
import { UserToRegister } from 'src/shared/dtos/auth/UserToRegister';
import { ILogin } from './ILogin';
import { IRegister } from './IRegister';
import { NotificationsService } from '../../notifications/notifications.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthLogicService implements ILogin, IRegister {

  /* #region [PublicProperties] */
  public registered = new BehaviorSubject<boolean>(false);
  /* #endregion */

  /* #region [PrivateProperties] */
  private _username = '';
  private _jwtHelperService: JwtHelperService = new JwtHelperService();
  /* #endregion */

  /* #region [PublicMethods] */
  constructor(
    private _authDataService: AuthDataService,
    private _storageService: StorageService,
    private _notificationsService: NotificationsService
  ) { }

  public login(userToLogin: UserToLogin): void {
    this._authDataService.login(userToLogin).subscribe((response: Token) => {
      this._storageService.setItemToLocalStorage('token', response.token);
    }, (error: string) => {
      console.log(error);
      this._notificationsService.error(error);
    });
  }

  public logout(): void {
    this._storageService.removeItemFromLocalStorage('token');
  }

  public loggedIn(): boolean {
    const token = this._storageService.getItemFromLocalStorage('token');
    return !this._jwtHelperService.isTokenExpired(token);
  }

  public register(userToRegister: UserToRegister): void {
    this._authDataService.register(userToRegister).subscribe((response: UserToRegister) => {
      const user: UserToLogin = {
        username: userToRegister.username,
        password: userToRegister.password
      } as UserToLogin;
      this.login(user);
      // this.registered.next(true);
      this._notificationsService.success('Registration Succesful');
    }, (error: string) => {
      console.log(error);
      this._notificationsService.error(error);
    });
  }

  public getUsername(): string {
    const token = this._storageService.getItemFromLocalStorage('token');
    const decodedToken = this._jwtHelperService.decodeToken(token);
    if (decodedToken) {
      this._username = decodedToken.unique_name;
    }
    return this._username;
  }

  public userAlreadyExist(username: string): boolean {
    return false;
  }
  /* #endregion */
}
