import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';

import { Component, Input, OnDestroy } from '@angular/core';

import { AuthLogicService } from '../../../../shared/services/auth/logic/auth-logic.service';

@Component({
  selector: 'app-members-card',
  templateUrl: './members-card.component.html',
  styleUrls: ['./members-card.component.scss']
})
export class MembersCardComponent implements OnDestroy {


  @Input() public user: User;

  private _subscriptions = new Subscription();

  constructor(
    private _authSevice: AuthLogicService,
    private _userService: UsersService,
    private _notificationService: NotificationsService
  ) { }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public sendLike(id: number): void {
    this._subscriptions.add(
      this._userService.sendLike(this._authSevice.getUserId(), id).subscribe(res => {
        this._notificationService.success(`You have liked ${this.user.knownAs}`);
        this.user.isLikedByUser = true;
      }, error => {
        this._notificationService.error(error);
      })
    );
  }

}
