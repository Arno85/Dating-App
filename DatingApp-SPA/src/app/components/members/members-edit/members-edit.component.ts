import { Component, OnInit, ViewEncapsulation, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/users/user';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { NgForm } from '@angular/forms';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-members-edit',
  templateUrl: './members-edit.component.html',
  styleUrls: ['./members-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersEditComponent implements OnInit, OnDestroy {

  /* #region [PublicProperties] */

  public user: User;
  public currentPhotoUrl: string;

  @ViewChild('editForm') public editForm: NgForm;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  /* #endregion */

  /* #region [PrivateProperties] */

  private _subscription = new Subscription();

  /* #endregion */

  /* #region [PublicMethods] */

  constructor(
    private _route: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private _userService: UsersLogicService,
    private _authService: AuthLogicService
  ) { }

  public ngOnInit(): void {
    this._route.data.subscribe(data => {
      this.user = data['user'];
    });

    this._subscription.add(
      this._authService.currentPhotoUrl
        .subscribe(photoUrl => this.currentPhotoUrl = photoUrl
      )
    );
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public updateUser(): void {
    this._userService.updateUser(this.user.id, this.user).subscribe(next => {
      this._notificationsService.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this._notificationsService.error(error);
    });
  }

  /* #endregion */
}
