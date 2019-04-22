import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';
import { AuthDataService } from 'src/shared/services/auth/data/auth-data.service';
import { LoginComponent } from './login/login.component';
import { BsDropdownModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot()
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
