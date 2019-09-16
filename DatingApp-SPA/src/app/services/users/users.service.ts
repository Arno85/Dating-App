import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from 'src/shared/models/pagination/pagination.model';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /* #region [PrivateProperties] */
  private readonly _apiUrl = environment.apiUrl;
  private readonly _controller = 'users/';
  /* #endregion */

  /* #region [PublicMethods] */

  constructor(
    private _http: HttpClient
  ) { }

  public getUsers(page?, itemsPerPage?, userParams = null, likeParams = null): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    if (userParams !== null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    if (likeParams === 'Likers') {
      params = params.append('likers', 'true');
    }

    if (likeParams === 'Likees') {
      params = params.append('likees', 'true');
    }

    return this._http.get<User[]>(`${this._apiUrl}${this._controller}`, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;

          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        }),
        tap(users => {
          return users.result.forEach(u => this._modifyUser(u));
        }),
      );
  }

  public getUser(id: number): Observable<User> {
    return this._http.get<User>(`${this._apiUrl}${this._controller}${id}`);
  }

  public updateUser(id: number, user: User): Observable<void> {
    return this._http.put<void>(`${this._apiUrl}${this._controller}${id}`, user);
  }

  public setMainPhoto(userId: number, photoId: number): Observable<void> {
    return this._http.post<void>(`${this._apiUrl}${this._controller}${userId}/photos/${photoId}/setMain`, {});
  }

  public deletePhoto(userId: number, photoId: number): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}${this._controller}${userId}/photos/${photoId}`);
  }

  public sendLike(userId: number, recipientId: number): Observable<void> {
    return this._http.post<void>(`${this._apiUrl}${this._controller}${userId}/like/${recipientId}`, {});
  }

  /* #endregion */

  private _modifyUser(u: User): User {
    u.photoUrl = u.photoUrl ? u.photoUrl : environment.defaultProfileImgPath;
    u.dateOfBirth = new Date(u.dateOfBirth);
    return u;
  }

}
