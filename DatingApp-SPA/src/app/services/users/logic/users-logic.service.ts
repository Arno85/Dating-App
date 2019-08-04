import { Injectable } from '@angular/core';
import { UsersDataService } from '../data/users-data.service';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { User } from 'src/app/models/users/user';
import { Observable } from 'rxjs';
import { UserForUpdateDto } from './../../../dtos/users/userForUpdate.dto';

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

  public updateUser(id: number, user: User): Observable<void> {
    return this._usersDataService.updateUser(id, this._userToUpdateUserDto(user));
  }

  private _userToUpdateUserDto(user: User): UserForUpdateDto {
    const userForUpdateDto = new UserForUpdateDto();
    userForUpdateDto.introduction = user.introduction;
    userForUpdateDto.lookingFor = user.lookingFor;
    userForUpdateDto.interests = user.interests;
    userForUpdateDto.city = user.city;
    userForUpdateDto.country = user.country;

    return userForUpdateDto;
  }

}
