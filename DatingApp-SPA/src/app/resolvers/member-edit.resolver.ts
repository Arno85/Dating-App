import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/users/user';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from 'src/shared/services/storage/storage.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

  constructor(
    private _userService: UsersLogicService,
    private _storageService: StorageService,
    private _jwtHelperService: JwtHelperService,
    private _router: Router,
    private _notificationsService: NotificationsService
  ) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const token = this._storageService.getItemFromLocalStorage('token');
    const decodedToken = this._jwtHelperService.decodeToken(token);

    return this._userService.getUser(decodedToken.nameid).pipe(
      catchError(error => {
        this._notificationsService.error('Problem retrieving your data');
        this._router.navigate(['/members']);
        return of(null);
      })
    );
  }

}
