import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/users/user.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

  constructor(
    private _userService: UsersLogicService,
    private _router: Router,
    private _notificationsService: NotificationsService
  ) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<User> {

    return this._userService.getUser(route.params['id']).pipe(
      catchError(error => {
        this._notificationsService.error('Problem retrieving data');
        this._router.navigate(['/members']);
        return of(null);
      })
    );
  }

}
