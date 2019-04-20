import { Component } from '@angular/core';
import { UserToRegister } from '../../../shared/dtos/auth/UserToRegister';
import { Router } from '@angular/router';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  /* #region [PublicProperties] */
  public userToRegister: UserToRegister = new UserToRegister();
  /* #endregion */

  /* #region [PublicMethods] */
  constructor(
    private _authLogicService: AuthLogicService,
    private _router: Router
  ) { }

  public register(): void {
    this._authLogicService.register(this.userToRegister);
    this._router.navigateByUrl('home');
  }

  public cancel(): void {
    this._router.navigateByUrl('home');
  }
  /* #endregion */

}
