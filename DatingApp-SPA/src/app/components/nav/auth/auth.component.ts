import { Component, OnInit } from '@angular/core';
import { UserToLogin } from 'src/app/dtos/auth/UserToLogin';
import { AuthLogicService } from 'src/app/services/auth/logic/auth-logic.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  /* #region [Public Properties] */
  public userToLogin: UserToLogin = new UserToLogin();
  public username = '';
  /* #endregion */

  /* #region [PublicMethods] */
  constructor(
    private _authLogicService: AuthLogicService
  ) { }

  public ngOnInit(): void  {
    this._setUpEvent();
  }

  public login(): void {
    this._authLogicService.login(this.userToLogin);
  }

  public loggedIn(): boolean {
    this.username = this._authLogicService.getUsernameFromStorage();
    return this._authLogicService.loggedIn();
  }

  public logout(): void {
    this._authLogicService.logout();
  }

  public _setUpEvent(): void {
    this._authLogicService.getUsername().subscribe(value => this.username = value);
  }
  /* #endregion */
}
