import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { PaginatedResult, Pagination } from 'src/shared/models/pagination/pagination.model';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  public isLoading = false;

  private _subscriptions = new Subscription();

  constructor(
    private _route: ActivatedRoute,
    private _usersService: UsersService,
    private _notificationsService: NotificationsService,
    private _authService: AuthLogicService
  ) { }

  public ngOnInit(): void {
    this.pagination.itemsPerPage = 18;
    this.pagination.currentPage = 1;
    this.user = this._authService.getCurrentUserFromStorage();
    this._route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
      this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
      this.userParams.minAge = 18;
      this.userParams.maxAge = 99;
      this.userParams.orderBy = 'lastActive';
    });
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  public resetFilters(): void {
    this.loadUsers();
  }

  public loadUsers(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._usersService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
        .subscribe((users: PaginatedResult<User[]>) => {
          this.users = users.result;
          this.pagination = users.pagination;
          this.isLoading = false;
        }, error => {
          this._notificationsService.error(error);
        })
    );
  }

}
