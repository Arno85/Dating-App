import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthLogicService } from 'src/shared/services/auth/logic/auth-logic.service';
import { AuthDataService } from 'src/shared/services/auth/data/auth-data.service';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    BrowserAnimationsModule
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
