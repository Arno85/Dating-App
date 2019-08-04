import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from './components/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgModule } from '@angular/core';

import { errorInterceptorProvider } from 'src/shared/http-interceptors/error-interceptor';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';
import { StorageService } from 'src/shared/services/storage/storage.service';

import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { NavModule } from './components/nav/nav.module';
import { RegisterModule } from './components/register/register.module';
import { MessagesModule } from './components/messages/messages.module';
import { ListsModule } from './components/lists/lists.module';
import { MembersModule } from './components/members/members.module';

export function tokenGetter() {
  const storageService = new StorageService();
  if (!environment.production) {
    console.log(`TOKEN : ${storageService.getItemFromLocalStorage('token')}`);
  }
  return storageService.getItemFromLocalStorage('token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes : ['localhost:5000/api/auth']
      }
    }),
    NavModule,
    HomeModule,
    RegisterModule,
    MembersModule,
    MessagesModule,
    ListsModule
  ],
  providers: [
    errorInterceptorProvider,
    NotificationsService,
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
