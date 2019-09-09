import { Component, Input, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/users/user.model';
import { AuthLogicService } from './../../../../../shared/services/auth/logic/auth-logic.service';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { NotificationsService } from './../../../../../shared/services/notifications/notifications.service';
import { Subscription } from 'rxjs';

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
    private _userService: UsersLogicService,
    private _notificationService: NotificationsService
  ) { }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public sendLike(id: number): void {
    this._subscriptions.add(
      this._userService.sendLike(this._authSevice.getUserId(), id).subscribe(res => {
        this._notificationService.success(`You have liked ${this.user.knownAs}`);
      }, error => {
        this._notificationService.error(error);
      })
    );
  }

}
