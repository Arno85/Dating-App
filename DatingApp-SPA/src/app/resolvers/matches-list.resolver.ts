import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginatedResult } from 'src/shared/models/pagination/pagination.model';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { User } from '../models/user.model';
import { UsersService } from '../services/users/users.service';

@Injectable()
export class MatchesListResolver implements Resolve<PaginatedResult<User[]>> {
  public pageNumber = 1;
  public pageSize = 18;
  public likeParams = 'Likers';

  constructor(
    private _userService: UsersService,
    private _router: Router,
    private _notificationsService: NotificationsService
  ) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<User[]>> {
    return this._userService.getUsers(this.pageNumber, this.pageSize, null, this.likeParams)
      .pipe(
        catchError(() => {
          this._notificationsService.error('Problem retrieving the data');
          this._router.navigate(['/home']);
          return of(null);
        })
      );
  }

}
