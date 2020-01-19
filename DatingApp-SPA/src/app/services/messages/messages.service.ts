import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/models/message.model';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from 'src/shared/models/pagination/pagination.model';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  /* #region [PrivateProperties] */
  private readonly _apiUrl = environment.apiUrl;
  private readonly _controller = 'users/';
  /* #endregion */

  /* #region [PublicMethods] */

  constructor(
    private _http: HttpClient
  ) { }

  public getMessages(userId: number, page?, itemsPerPage?, messageParams?): Observable<PaginatedResult<Message[]>> {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

    let params = new HttpParams();

    params = params.append('MessageContainer', messageParams);

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this._http.get<Message[]>(`${this._apiUrl}${this._controller}${userId}/messages/`, { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;

          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }

  public getMessageThread(userId: number, recipientId: number): Observable<Message[]> {
    return this._http.get<Message[]>(`${this._apiUrl}${this._controller}${userId}/messages/thread/${recipientId}`);
  }

  public sendMessage(userId: number, message: Message): Observable<Message> {
    return this._http.post<Message>(`${this._apiUrl}${this._controller}${userId}/messages`, message);
  }

  public deleteMessage(userId: number, messageId: number): Observable<void> {
    return this._http.post<void>(`${this._apiUrl}${this._controller}${userId}/messages/${messageId}`, {});
  }

  public markAsRead(userId: number, messageId: number): Observable<void> {
    return this._http.post<void>(`${this._apiUrl}${this._controller}${userId}/messages/${messageId}/read`, {});
  }

  /* #endregion */
}
