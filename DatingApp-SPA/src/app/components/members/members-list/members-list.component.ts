import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { User } from 'src/app/models/users/user.model';
import { Pagination, PaginatedResult } from 'src/shared/models/pagination/pagination.model';
import { StorageService } from 'src/shared/services/storage/storage.service';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';
import { MaxLengthValidator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-members',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit, OnDestroy {

  public users: User[] = new Array<User>();
  public user: User;
  public genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
  public userParams: any = {};
  public pagination: Pagination = new Pagination();

  private _subscriptions = new Subscription();

  constructor(
    private _usersLogicService: UsersLogicService,
    private _notificationsService: NotificationsService,
    private _authService: AuthLogicService
  ) { }

  public ngOnInit(): void {
    this.pagination.itemsPerPage = 5;
    this.pagination.currentPage = 1;
    this.user = this._authService.getCurrentUserFromStorage();
    this.resetFilters();
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  public resetFilters(): void {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
    this.loadUsers();
  }

  public loadUsers(): void {
    this._subscriptions.add(
      this._usersLogicService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
        .subscribe((users: PaginatedResult<User[]>) => {
          this.users = users.result;
          this.pagination = users.pagination;
        }, error => {
          this._notificationsService.error(error);
        })
    );
  }

}
