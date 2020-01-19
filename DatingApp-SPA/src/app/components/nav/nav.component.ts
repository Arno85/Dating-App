import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthLogicService } from '../../../shared/services/auth/logic/auth-logic.service';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  public title = 'Dating App';
  public showLinks = false;

  private subscription = new Subscription();

  constructor(private _authLogicService: AuthLogicService) { }

  public ngOnInit(): void {
    this.subscription.add(
      this._authLogicService.currentUser.subscribe(user => {
        this.showLinks = isNullOrUndefined(user) && isNullOrUndefined(this._authLogicService.getCurrentUserFromStorage())
          ? false
          : true;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
