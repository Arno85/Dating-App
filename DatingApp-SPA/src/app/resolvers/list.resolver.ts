import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PaginatedResult } from 'src/shared/models/pagination/pagination.model';
import { UsersService } from '../services/users/users.service';
import { User } from '../models/user.model';

@Injectable()
export class ListResolver {
  pageNumber = 1;
  pageSize = 18;
  likeParams = 'Likers';

  constructor(
    private _userService: UsersService,
    private _router: Router,
    private _notificationsService: NotificationsService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<User[]>> {
    return this._userService.getUsers(this.pageNumber, this.pageSize, null, this.likeParams)
      .pipe(
        catchError(error => {
          this._notificationsService.error('Problem retrieving the data');
          this._router.navigate(['/home']);
          return of(null);
        })
      );
  }

}
