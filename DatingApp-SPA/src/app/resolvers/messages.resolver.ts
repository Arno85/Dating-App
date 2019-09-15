import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginatedResult } from 'src/shared/models/pagination/pagination.model';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Message } from '../models/message.model';
import { MessagesService } from '../services/messages/messages.service';

@Injectable()
export class MessagesResolver implements Resolve<PaginatedResult<Message[]>> {
  public pageNumber = 1;
  public pageSize = 5;
  public messageContainer = 'Unread';

  constructor(
    private _messagesService: MessagesService,
    private _router: Router,
    private _notificationsService: NotificationsService,
    private _authService: AuthLogicService
  ) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<Message[]>> {
    return this._messagesService.getMessages(this._authService.getUserId(), this.pageNumber, this.pageSize, this.messageContainer)
      .pipe(
        catchError(() => {
          this._notificationsService.error('Problem retrieving messages');
          this._router.navigate(['/home']);
          return of(null);
        })
      );
  }

}
