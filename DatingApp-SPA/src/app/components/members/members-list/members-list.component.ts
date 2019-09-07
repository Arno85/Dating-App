import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users/user';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { AuthLogicService } from './../../../../shared/services/auth/logic/auth-logic.service';

@Component({
  selector: 'app-list-members',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {

  public users: User[] = new Array<User>();

  constructor(
    private _usersLogicService: UsersLogicService,
    private _notificationsService: NotificationsService
  ) { }

  public ngOnInit(): void {
    this._getUsers();
  }

  private _getUsers(): void {
    this._usersLogicService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this._notificationsService.error(error);
    });
  }

}
