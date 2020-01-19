import { environment } from 'src/environments/environment';
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';
import { errorInterceptorProvider } from 'src/shared/http-interceptors/error-interceptor';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { StorageService } from 'src/shared/services/storage/storage.service';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { ListsModule } from './components/lists/lists.module';
import { MembersModule } from './components/members/members.module';
import { MessagesModule } from './components/messages/messages.module';
import { NavModule } from './components/nav/nav.module';
import { RegisterModule } from './components/register/register.module';
import { AdminModule } from './components/admin/admin.module';

export function tokenGetter() {
  const storageService = new StorageService();
  if (!environment.production) {
    const token = storageService.getItemFromLocalStorage('token');
    if (token !== null) {
      console.log(`TOKEN : ${token}`);
    }
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
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),
    NavModule,
    HomeModule,
    RegisterModule,
    MembersModule,
    ListsModule,
    MessagesModule,
    AdminModule
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
