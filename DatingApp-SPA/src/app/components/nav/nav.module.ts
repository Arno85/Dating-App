import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthLogicService } from 'src/app/services/auth/logic/auth-logic.service';
import { AuthDataService } from './../../services/auth/data/auth-data.service';


@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    NavComponent,
    AuthComponent
  ],
  providers: [
    AuthLogicService,
    AuthDataService
  ],
  exports: [
    NavComponent
  ]
})
export class NavModule { }
