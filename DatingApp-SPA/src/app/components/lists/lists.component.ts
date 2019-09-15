import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users/users.service';
import { PaginatedResult, Pagination } from 'src/shared/models/pagination/pagination.model';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, OnDestroy {
  public users: User[];
  public pagination: Pagination = new Pagination();
  public likeParams: string;

  private _subscriptions = new Subscription();

  constructor(
    private _usersService: UsersService,
    private _route: ActivatedRoute,
    private _notificationsService: NotificationsService
  ) { }

  public ngOnInit(): void {
    this._subscriptions.add(
      this._route.data.subscribe(data => {
        this.users = data['users'].result;
        this.pagination = data['users'].pagination;
      })
    );

    this.likeParams = 'Likers';
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  public loadUsers(): void {
    this._subscriptions.add(
      this._usersService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likeParams)
        .subscribe((users: PaginatedResult<User[]>) => {
          this.users = users.result;
          this.pagination = users.pagination;
        }, error => {
          this._notificationsService.error(error);
        })
    );
  }

}
