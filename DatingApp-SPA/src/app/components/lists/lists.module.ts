import { MatchesListResolver } from 'src/app/resolvers/matches-list.resolver';
import { UsersService } from 'src/app/services/users/users.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';
import { PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListsComponent } from './lists.component';

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
    MatchesListResolver
  ],
  exports: [
    ListsComponent
  ]
})
export class ListsModule { }
