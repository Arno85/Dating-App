import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { StorageService } from 'src/shared/services/storage/storage.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UsersService } from '../services/users/users.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

  constructor(
    private _userService: UsersService,
    private _storageService: StorageService,
    private _jwtHelperService: JwtHelperService,
    private _router: Router,
    private _notificationsService: NotificationsService
  ) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const token = this._storageService.getItemFromLocalStorage('token');
    const decodedToken = this._jwtHelperService.decodeToken(token);

    return this._userService.getUser(decodedToken.nameid).pipe(
      catchError(() => {
        this._notificationsService.error('Problem retrieving your data');
        this._router.navigate(['/members']);
        return of(null);
      })
    );
  }

}
