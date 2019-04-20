import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-success-notification',
  templateUrl: './success-notification.component.html',
  styleUrls: ['./success-notification.component.css']
})
export class SuccessNotificationComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    this.data = 'Success!';
  }

}
