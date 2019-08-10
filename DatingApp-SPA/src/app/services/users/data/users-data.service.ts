import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/users/user';
import { UserForUpdateDto } from 'src/app/dtos/users/userForUpdate.dto';

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

  public updateUser(id: number, user: UserForUpdateDto): Observable<void> {
    return this._http.put<void>(`${this._apiUrl}${this._controller}${id}`, user);
  }

  public setMainPhoto(userId: number, photoId: number): Observable<void> {
    return this._http.post<void>(`${this._apiUrl}${this._controller}${userId}/photos/${photoId}/setMain`, {});
  }

  public deletePhoto(userId: number, photoId: number): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}${this._controller}${userId}/photos/${photoId}`);
  }

  /* #endregion */

}
