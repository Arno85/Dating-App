import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthLogicService } from '../../services/auth/logic/auth-logic.service';
import { NotificationsService } from '../../services/notifications/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthLogicService,
    private _router: Router,
    private _notificationsService: NotificationsService
  ) { }

  public canActivate(next: ActivatedRouteSnapshot): boolean {

    const roles = next.firstChild.data['roles'] as Array<string>;
    if (roles) {
      if (this._authService.roleMatch(roles)) {
        return true;
      } else {
        this._router.navigate(['members']);
        this._notificationsService.error('You are not authorized to acess this area');
      }
    }

    if (this._authService.loggedIn()) {
      return true;
    }
    this._notificationsService.error('You shall not passed!!!');
    this._router.navigate(['./home']);
    return false;
  }
}
