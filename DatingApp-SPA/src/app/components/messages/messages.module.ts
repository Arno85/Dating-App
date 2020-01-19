import { ButtonsModule, PaginationModule, TooltipModule } from 'ngx-bootstrap';
import { SharedModule } from 'src/app/components/shared.module';
import { MessagesResolver } from 'src/app/resolvers/messages.resolver';
import { UsersService } from 'src/app/services/users/users.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MessagesComponent } from './messages.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    MatProgressSpinnerModule,
    TooltipModule.forRoot()
  ],
  providers: [
    UsersService,
    MessagesResolver
  ],
  exports: [
    MessagesComponent
  ]
})
export class MessagesModule { }
