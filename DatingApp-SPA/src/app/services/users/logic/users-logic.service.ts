import { Injectable } from '@angular/core';
import { UsersDataService } from '../data/users-data.service';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { User } from 'src/app/models/users/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersLogicService {

  constructor(
    private _usersDataService: UsersDataService,
    private _notificationsService: NotificationsService
  ) { }

  public getUsers(): Observable<User[]> {
    return this._usersDataService.getUsers();
  }

  public getUser(id: number): Observable<User> {
    return this._usersDataService.getUser(id);
  }

}
