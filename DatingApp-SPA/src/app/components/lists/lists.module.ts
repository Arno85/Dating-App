import { UsersService } from 'src/app/services/users/users.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';
import { PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListsComponent } from './lists.component';
import { ListResolver } from 'src/app/resolvers/list.resolver';

@NgModule({
  declarations: [
    ListsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([]),
    FormsModule,
    SharedModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    UsersService,
    ListResolver
  ],
  exports: [
    ListsComponent
  ]
})
export class ListsModule { }
