import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';
import { AuthDataService } from 'src/shared/services/auth/data/auth-data.service';
import { BsDatepickerModule } from 'ngx-bootstrap';

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
