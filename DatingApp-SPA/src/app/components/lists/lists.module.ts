import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists.component';
import { ListResolver } from 'src/app/resolvers/list.resolver';
import { PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { UsersDataService } from 'src/app/services/users/data/users-data.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [

  ],
  imports: [

  ],
  providers: [

  ],
  exports: [

  ]
})
export class ListsModule { }
