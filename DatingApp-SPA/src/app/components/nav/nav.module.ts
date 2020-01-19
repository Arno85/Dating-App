import { BsDropdownModule } from 'ngx-bootstrap';
import { AuthDataService } from 'src/shared/services/auth/data/auth-data.service';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav.component';
import { AdminModule } from '../admin/admin.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    AdminModule
  ],
  declarations: [
    NavComponent,
    LoginComponent
  ],
  providers: [
    AuthLogicService,
    AuthDataService
  ],
  exports: [
    NavComponent,
    LoginComponent
  ]
})
export class NavModule { }
