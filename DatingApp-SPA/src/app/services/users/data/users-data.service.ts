import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/users/user.model';
import { UserForUpdateDto } from 'src/app/dtos/users/userForUpdate.dto';
import { PaginatedResult } from 'src/shared/models/pagination/pagination.model';
import { map } from 'rxjs/operators';

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

  public getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
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

    return this._http.get<User[]>(`${this._apiUrl}${this._controller}`, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;

          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
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
