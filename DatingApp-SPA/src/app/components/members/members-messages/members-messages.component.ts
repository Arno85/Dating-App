import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { AuthLogicService } from './../../../../shared/services/auth/logic/auth-logic.service';
import { NotificationsService } from './../../../../shared/services/notifications/notifications.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-members-messages',
  templateUrl: './members-messages.component.html',
  styleUrls: ['./members-messages.component.scss']
})
export class MembersMessagesComponent implements OnInit, OnDestroy {

  @Input() public recipientId: number;

  public messages: Message[];
  public newMessage: any = {};

  private _subscriptions = new Subscription();

  constructor(
    private _authService: AuthLogicService,
    private _messagesService: MessagesService,
    private _notificationsService: NotificationsService
    ) { }

  public ngOnInit(): void {
    this.loadMessages();
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public loadMessages(): void {
    const currentUserId = this._authService.getUserId();

    this._subscriptions.add(
      this._messagesService.getMessageThread(this._authService.getUserId(), this.recipientId)
      .pipe(
        tap(messages => {
          messages.forEach(m => {
            if (m.isRead === false && m.recipientId === currentUserId) {
              this._messagesService.markAsRead(currentUserId, m.id).subscribe();
            }
          });
        })
      )
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
        this._notificationsService.error(error);
      })
    );
  }

  public sendMessage(): void {
    this.newMessage.recipientId = this.recipientId;
    this._messagesService.sendMessage(this._authService.getUserId(), this.newMessage).subscribe(message => {
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this._notificationsService.error(error);
    });
  }


}
