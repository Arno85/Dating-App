import { BsDatepickerModule } from 'ngx-bootstrap';
import { AuthDataService } from 'src/shared/services/auth/data/auth-data.service';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    RegisterComponent
  ],
  exports: [
    RegisterComponent
  ],
  providers: [
    AuthLogicService,
    AuthDataService
  ]
})
export class RegisterModule { }
