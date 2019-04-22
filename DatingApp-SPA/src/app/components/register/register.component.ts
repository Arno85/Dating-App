import { Component, OnDestroy } from '@angular/core';
import { UserToRegister } from '../../../shared/dtos/auth/UserToRegister';
import { Router } from '@angular/router';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';
import { IRegister } from 'src/shared/services/auth/logic/IRegister';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements IRegister, OnDestroy {

  /* #region [PublicProperties] */
  public userToRegister: UserToRegister = new UserToRegister();
  /* #endregion */

  /* #region [PrivateProperties] */
  private _subscription: Subscription = new Subscription();
  /* #endregion */

  /* #region [PublicMethods] */
  constructor(
    private _authLogicService: AuthLogicService,
    private _router: Router
  ) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public register(): void {
    this._authLogicService.register(this.userToRegister);
    this._subscription.add(this._authLogicService.registered.subscribe(value => {
      if (value) {
        this._router.navigateByUrl('home');
      }
    }));
  }

  public cancel(): void {
    this._router.navigateByUrl('home');
  }
  /* #endregion */

}
