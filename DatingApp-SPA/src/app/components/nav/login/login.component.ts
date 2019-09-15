import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserToLogin } from 'src/shared/dtos/auth/UserToLogin';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';
import { ILogin } from 'src/shared/services/auth/logic/ILogin';

import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, ILogin {

  /* #region [PublicProperties] */
  public userToLogin: UserToLogin = new UserToLogin();
  public username: string;
  public currentUser: User;
  public photoUrl: string;
  /* #endregion */

  /* #region [PrivateProperties] */
  private _subscription = new Subscription();
  /* #endregion */

  /* #region [PublicMethods] */
  constructor(
    private _authLogicService: AuthLogicService
  ) { }

  public ngOnInit(): void  {
    const user = this._authLogicService.getCurrentUserFromStorage();
    this._authLogicService.changeMemberPhoto(user.photoUrl);

    this._subscription.add(
      this._authLogicService.currentPhotoUrl.subscribe(photoUrl => {
        this.photoUrl = photoUrl || '';
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
    this.username = this._authLogicService.getUsername();
    this.currentUser = this._authLogicService.getCurrentUserFromStorage();
    const loggedIn = this._authLogicService.loggedIn();
    return loggedIn;
  }

  public logout(): void {
    this._authLogicService.logout();
    this.currentUser = null;
  }
  /* #endregion */
}

