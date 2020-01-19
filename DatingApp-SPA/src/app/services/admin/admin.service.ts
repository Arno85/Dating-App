import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserWithRole } from 'src/app/models/userwithrole.model';
import { Photo } from 'src/app/models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  /* #region [PrivateProperties] */
  private readonly _apiUrl = environment.apiUrl;
  private readonly _controller = 'admin/';
  /* #endregion */

  /* #region [Public Methods] */

  constructor(private _http: HttpClient) { }

  public getUsersWithRoles(): Observable<UserWithRole[]> {
    return this._http.get<UserWithRole[]>(`${this._apiUrl}${this._controller}userswithroles`);
  }

  public getRoles(): Observable<string[]> {
    return this._http.get<string[]>(`${this._apiUrl}${this._controller}roles`);
  }

  public updateUserRoles(user: UserWithRole, roles: {}): Observable<void> {
    return this._http.post<void>(`${this._apiUrl}${this._controller}editRoles/${user.username}`, roles);
  }

  public getPhotosForModeration(): Observable<Photo[]> {
    return this._http.get<Photo[]>(`${this._apiUrl}${this._controller}photosForModeration`);
  }

  public moderatePhoto(moderation: boolean, photoId: number): Observable<void> {
    return this._http.put<void>(`${this._apiUrl}${this._controller}moderatePhoto/${photoId}`, { moderation });
  }
  /* #endregion */
}
