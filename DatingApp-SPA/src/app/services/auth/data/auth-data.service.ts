import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/auth/token';
import { UserToLogin } from 'src/app/dtos/auth/UserToLogin';
import { UserToRegister } from '../../../dtos/auth/UserToRegister';

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

  public login(userToLogin: UserToLogin): Observable<Token> {
    return this._http.post<Token>(`${this._apiUrl}${this._controller}login`, userToLogin);
  }

  public register(userToRegister: UserToRegister): Observable<UserToRegister> {
    return this._http.post<UserToRegister>(`${this._apiUrl}${this._controller}register`, userToRegister);
  }
  /* #endregion */
}
