import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthDataService } from '../data/auth-data.service';
import { StorageService } from '../../storage/storage.service';
import { UserToLogin } from 'src/shared/dtos/auth/UserToLogin';
import { UserToRegister } from 'src/shared/dtos/auth/UserToRegister';
import { ILogin } from './ILogin';
import { IRegister } from './IRegister';
import { NotificationsService } from '../../notifications/notifications.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ResponseAuth } from 'src/shared/models/auth/responseAuth.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthLogicService implements ILogin, IRegister {

  /* #region [PrivateProperties] */
  private _username = '';
  private _userRoles = new Array<string>();
  private _userId = null;
  private _jwtHelperService: JwtHelperService = new JwtHelperService();
  private _userLoggedIn = new BehaviorSubject<User>(this.getCurrentUserFromStorage());
  /* #endregion */

  /* #region [PublicProperties] */
  public registered = new BehaviorSubject<boolean>(false);
  public currentUser = this._userLoggedIn.asObservable();
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
      this._storageService.setItemToLocalStorage('user', JSON.stringify(response.user));
      // Emit event for nav, login, etc
      this._userLoggedIn.next(response.user);
      // Navigate to members page
      this._router.navigate(['/members']);
    }, (error: string) => {
      this._notificationsService.error(error);
    });
  }

  public logout(): void {
    this._storageService.removeItemFromLocalStorage('token');
    this._storageService.removeItemFromLocalStorage('user');
    this._userLoggedIn.next(null);
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

  public getRoles(): string[] {
    const token = this._storageService.getItemFromLocalStorage('token');
    const decodedToken = this._jwtHelperService.decodeToken(token);

    if (decodedToken) {
      this._userRoles = decodedToken.role;
    }
    return this._userRoles;
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
    const user: User = JSON.parse(this._storageService.getItemFromLocalStorage('user'));
    user.photoUrl = photoUrl;
    this._storageService.setItemToLocalStorage('user', JSON.stringify(user));
    this._userLoggedIn.next(user);
  }

  public verifyEmail(email: string): Observable<boolean> {
    return this._authDataService.verifyEmail(email);
  }

  public verifyUsername(username: string): Observable<boolean> {
    return this._authDataService.verifyUsername(username);
  }

  public roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles = this.getRoles();

    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });

    return isMatch;
  }
  /* #endregion */
}
