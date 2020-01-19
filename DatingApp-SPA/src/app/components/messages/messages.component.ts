import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { Pagination } from 'src/shared/models/pagination/pagination.model';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthLogicService } from '../../../shared/services/auth/logic/auth-logic.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  public messages: Message[];
  public pagination: Pagination;
  public messageContainer = 'Unread';
  public isLoading = true;

  private _subscriptions = new Subscription();

  constructor(
    private _messagesService: MessagesService,
    private _authService: AuthLogicService,
    private _route: ActivatedRoute,
    private _notificationsService: NotificationsService
  ) { }

  public ngOnInit(): void {
    this._subscriptions.add(
      this._route.data.subscribe(data => {
        this.messages = data['messages'].result;
        this.pagination = data['messages'].pagination;
        this.isLoading = false;
      })
    );
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public loadMessages(): void {
    this.isLoading = true;
    this._subscriptions.add(
      this._messagesService.getMessages(
        this._authService.getUserId(),
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.messageContainer)
        .subscribe(res => {
          this.messages = res.result;
          this.pagination = res.pagination;
          this.isLoading = false;
        }, error => {
          this._notificationsService.error(error);
        })
    );
  }

  public pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  public deleteMessage(id: number): void {
    this._subscriptions.add(
      this._notificationsService.confirm('Are you sure you want delete this message?', 'Delete message', () => {
        this._messagesService.deleteMessage(this._authService.getUserId(), id).subscribe(() => {
          const index = this.messages.findIndex(m => m.id === id);
          this.messages.splice(index, 1);
          this._notificationsService.success('Message has been deleted');
        }, () => {
          this._notificationsService.error('Failed to delete the message');
        });
      })
    );
  }

}
