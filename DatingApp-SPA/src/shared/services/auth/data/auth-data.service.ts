import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserToLogin } from 'src/shared/dtos/auth/UserToLogin';
import { UserToRegister } from '../../../dtos/auth/UserToRegister';
import { ResponseAuth } from 'src/shared/models/auth/responseAuth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  /* #region [PrivateProperties] */
  private readonly _apiUrl = environment.apiUrl;
  private readonly _controller = 'auth/';
  /* #endregion */

  /* #region [PublicMethods] */
  constructor(
    private _http: HttpClient
  ) { }

  public login(userToLogin: UserToLogin): Observable<ResponseAuth> {
    return this._http.post<ResponseAuth>(`${this._apiUrl}${this._controller}login`, userToLogin);
  }

  public register(userToRegister: UserToRegister): Observable<UserToRegister> {
    return this._http.post<UserToRegister>(`${this._apiUrl}${this._controller}register`, userToRegister);
  }

  public verifyEmail(email: string): Observable<boolean> {
    return this._http.get<boolean>(`${this._apiUrl}${this._controller}verifyEmail/${email}`);
  }

  public verifyUsername(username: string): Observable<boolean> {
    return this._http.get<boolean>(`${this._apiUrl}${this._controller}verifyUsername/${username}`);
  }
  /* #endregion */
}
