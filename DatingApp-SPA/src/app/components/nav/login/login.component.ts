import { Component, OnInit } from '@angular/core';
import { UserToLogin } from 'src/shared/dtos/auth/UserToLogin';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';
import { ILogin } from 'src/shared/services/auth/logic/ILogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, ILogin {

  /* #region [PublicProperties] */
  public userToLogin: UserToLogin = new UserToLogin();
  public username: string;
  /* #endregion */

  /* #region [PublicMethods] */
  constructor(
    private _authLogicService: AuthLogicService
  ) { }

  public ngOnInit(): void  {}

  public login(): void {
    this._authLogicService.login(this.userToLogin);
  }

  public loggedIn(): boolean {
    this.username = this._authLogicService.getUsername();
    return this._authLogicService.loggedIn();
  }

  public logout(): void {
    this._authLogicService.logout();
  }
  /* #endregion */
}
