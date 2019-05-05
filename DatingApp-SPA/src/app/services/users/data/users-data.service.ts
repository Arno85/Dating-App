import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/users/user';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  /* #region [PrivateProperties] */
  private readonly _apiUrl = environment.apiUrl;
  private readonly _controller = 'users/';
  /* #endregion */

  /* #region [PublicMethods] */
  constructor(
    private _http: HttpClient
  ) { }

  public getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this._apiUrl}${this._controller}`);
  }

  public getUser(id: number): Observable<User> {
    return this._http.get<User>(`${this._apiUrl}${this._controller}${id}`);
  }
  /* #endregion */

}
