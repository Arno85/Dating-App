import { Injectable } from '@angular/core';
import { UsersDataService } from '../data/users-data.service';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { User } from 'src/app/models/users/user';
import { Observable } from 'rxjs';
import { UserForUpdateDto } from './../../../dtos/users/userForUpdate.dto';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsersLogicService {

  constructor(
    private _usersDataService: UsersDataService
  ) { }

  public getUsers(): Observable<User[]> {
    return this._usersDataService.getUsers().pipe(
      map(users => users.map(u => this._modifyUser(u)))
    );
  }

  public getUser(id: number): Observable<User> {
    return this._usersDataService.getUser(id).pipe(
      map(u => this._modifyUser(u))
    );
  }

  public updateUser(id: number, user: User): Observable<void> {
    return this._usersDataService.updateUser(id, this._userToUpdateUserDto(user));
  }

  public setMainPhoto(userId: number, photoId: number): Observable<void> {
    return this._usersDataService.setMainPhoto(userId, photoId);
  }

  public deletePhoto(userId: number, photoId: number): Observable<void> {
    return this._usersDataService.deletePhoto(userId, photoId);
  }

  private _userToUpdateUserDto(user: User): UserForUpdateDto {
    const userForUpdateDto = new UserForUpdateDto();
    userForUpdateDto.dateOfBirth = user.dateOfBirth;
    userForUpdateDto.knowAs = user.knownAs;
    userForUpdateDto.introduction = user.introduction;
    userForUpdateDto.lookingFor = user.lookingFor;
    userForUpdateDto.interests = user.interests;
    userForUpdateDto.city = user.city;
    userForUpdateDto.country = user.country;

    return userForUpdateDto;
  }

  private _modifyUser(u: User): User {
    u.photoUrl = u.photoUrl ? u.photoUrl : environment.defaultProfileImgPath;
    u.dateOfBirth = new Date(u.dateOfBirth);
    return u;
  }

}
