import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/users/user.model';
import { Pagination, PaginatedResult } from 'src/shared/models/pagination/pagination.model';
import { AuthLogicService } from './../../../shared/services/auth/logic/auth-logic.service';
import { UsersLogicService } from './../../services/users/logic/users-logic.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, OnDestroy {
  public users: User[];
  public pagination: Pagination;
  public likeParams: string;

  private _subscriptions = new Subscription();

  constructor(
    private _authService: AuthLogicService,
    private _usersService: UsersLogicService,
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
    console.log(this.likeParams);
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
