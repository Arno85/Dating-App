import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
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
  ) {}

  public canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true;
    }
    this._notificationsService.error('You shall not passed!!!');
    this._router.navigate(['./home']);
    return false;
  }
}
