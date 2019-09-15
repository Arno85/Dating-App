import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { UsersService } from '../services/users/users.service';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

  constructor(
    private _userService: UsersService,
    private _router: Router,
    private _notificationsService: NotificationsService
  ) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<User> {

    return this._userService.getUser(route.params['id']).pipe(
      catchError(() => {
        this._notificationsService.error('Problem retrieving data');
        this._router.navigate(['/members']);
        return of(null);
      })
    );
  }

}
