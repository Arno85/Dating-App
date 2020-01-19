import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserToLogin } from 'src/shared/dtos/auth/UserToLogin';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';
import { ILogin } from 'src/shared/services/auth/logic/ILogin';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, ILogin {

  /* #region [PublicProperties] */
  public userToLogin: UserToLogin = new UserToLogin();
  public currentPhoto = '';
  public currentUser: User;
  /* #endregion */

  /* #region [PrivateProperties] */
  private readonly defaultPhotoUrl = 'assets/img/user.png';
  private _subscription = new Subscription();
  /* #endregion */

  /* #region [PublicMethods] */
  constructor(
    private _authLogicService: AuthLogicService
  ) { }

  public ngOnInit(): void {
    this._subscription.add(
      this._authLogicService.currentUser.subscribe(user => {
        if (isNullOrUndefined(user)) {
          this.currentUser = this._authLogicService.getCurrentUserFromStorage();

          this.currentPhoto = !isNullOrUndefined(user) && this.isPhotoUrlNull()
            ? this.currentUser.photoUrl
            : this.defaultPhotoUrl;

        } else {
          this.currentUser = user;

          this.currentPhoto = this.isPhotoUrlNull()
            ? this.currentUser.photoUrl
            : this.defaultPhotoUrl;
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public login(): void {
    this._authLogicService.login(this.userToLogin);
  }

  public loggedIn(): boolean {
    return this._authLogicService.loggedIn();
  }

  public logout(): void {
    this._authLogicService.logout();
  }
  /* #endregion */

  /* region [PrivateMethods] */
  private isPhotoUrlNull(): boolean {
    return !isNullOrUndefined(this.currentUser.photoUrl) && this.currentUser.photoUrl !== '';
  }
  /* #endregion */
}

