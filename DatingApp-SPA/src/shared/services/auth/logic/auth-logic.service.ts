import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthDataService } from '../data/auth-data.service';
import { StorageService } from '../../storage/storage.service';
import { UserToLogin } from 'src/shared/dtos/auth/UserToLogin';
import { UserToRegister } from 'src/shared/dtos/auth/UserToRegister';
import { ILogin } from './ILogin';
import { IRegister } from './IRegister';
import { NotificationsService } from '../../notifications/notifications.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users/user';
import { ResponseAuth } from 'src/shared/models/auth/responseAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthLogicService implements ILogin, IRegister {

  /* #region [PublicProperties] */
  public registered = new BehaviorSubject<boolean>(false);
  /* #endregion */

  /* #region [PrivateProperties] */
  private _username = '';
  private _userId = null;
  private _jwtHelperService: JwtHelperService = new JwtHelperService();
  private _photoUrl = new BehaviorSubject<string>('../assets/img/user.png');
  public currentPhotoUrl = this._photoUrl.asObservable();
  /* #endregion */

  /* #region [PublicMethods] */
  constructor(
    private _authDataService: AuthDataService,
    private _storageService: StorageService,
    private _notificationsService: NotificationsService,
    private _router: Router
  ) { }

  public login(userToLogin: UserToLogin): void {
    this._authDataService.login(userToLogin).subscribe((response: ResponseAuth) => {
      // Set token in Local Storage
      this._storageService.setItemToLocalStorage('token', response.token);
      // Set user info in Local Storage
      this._setCurrentUserInStorage(response.user);
      // Navigate to members page
      this._router.navigate(['/members']);
    }, (error: string) => {
      this._notificationsService.error(error);
    });
  }

  public logout(): void {
    this._storageService.removeItemFromLocalStorage('token');
    this._storageService.removeItemFromLocalStorage('user');
    this._router.navigate(['']);
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
      this._notificationsService.success('Registration Succesful');
    }, (error: string) => {
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

  public getUserId(): number {
    const token = this._storageService.getItemFromLocalStorage('token');
    const decodedToken = this._jwtHelperService.decodeToken(token);
    if (decodedToken) {
      this._userId = decodedToken.nameid;
    }
    return Number(this._userId);
  }

  public getToken(): string {
    const token = this._storageService.getItemFromLocalStorage('token');
    return `Bearer ${token}`;
  }

  public getCurrentUserFromStorage(): User {
    const user: User = JSON.parse(this._storageService.getItemFromLocalStorage('user'));
    return user;
  }

  public changeMemberPhoto(photoUrl: string): void {
    this._photoUrl.next(photoUrl);
    const user: User = this.getCurrentUserFromStorage();
    user.photoUrl = photoUrl;
    this._setCurrentUserInStorage(user);
  }
  /* #endregion */

  /* #region [PrivateMethods] */

  private _setCurrentUserInStorage(user: User): void {
    this._storageService.setItemToLocalStorage('user', JSON.stringify(user))
  }

  /* #endregion */
}
