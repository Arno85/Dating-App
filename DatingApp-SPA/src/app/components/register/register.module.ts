import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { AuthLogicService } from 'src/app/services/auth/logic/auth-logic.service';
import { AuthDataService } from 'src/app/services/auth/data/auth-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { SuccessNotificationComponent } from 'src/shared/notifications/success-notification/success-notification.component';
import { ErrorNotificationComponent } from 'src/shared/notifications/error-notification/error-notification.component';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  declarations: [
    RegisterComponent,
    SuccessNotificationComponent,
    ErrorNotificationComponent
  ],
  exports: [
    RegisterComponent,
    SuccessNotificationComponent,
    ErrorNotificationComponent
  ],
  providers: [
    AuthLogicService,
    AuthDataService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  entryComponents: [
    SuccessNotificationComponent,
    ErrorNotificationComponent
  ]
})
export class RegisterModule { }
