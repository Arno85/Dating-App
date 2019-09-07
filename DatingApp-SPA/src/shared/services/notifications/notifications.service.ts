import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  public confirm(message: string, header: string, okCallback: () => any): void {
    alertify.confirm(message, (e: Event) => {
      if (e) {
        okCallback();
      }
    }).setHeader(header);
  }

  public success(message: string): void {
    alertify.success(message);
  }

  public error(message: string): void {
    alertify.error(message);
  }

  public warning(message: string): void {
    alertify.warning(message);
  }

  public message(message: string): void {
    alertify.message(message);
  }
}
