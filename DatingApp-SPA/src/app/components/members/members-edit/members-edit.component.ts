import { Component, OnInit, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/models/users/user';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { NgForm } from '@angular/forms';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-members-edit',
  templateUrl: './members-edit.component.html',
  styleUrls: ['./members-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersEditComponent implements OnInit {

  public user: User;

  @ViewChild('editForm') public editForm: NgForm;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private _route: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private _userService: UsersLogicService,
    private _jwtService: JwtHelperService
  ) { }

  public ngOnInit(): void {
    this._route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  public updateUser(): void {
    this._userService.updateUser(this.user.id, this.user).subscribe(next => {
      this._notificationsService.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this._notificationsService.error(error);
    });
  }

}
