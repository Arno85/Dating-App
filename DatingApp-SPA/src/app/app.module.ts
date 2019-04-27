import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from './components/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { NavModule } from './components/nav/nav.module';
import { NgModule } from '@angular/core';
import { RegisterModule } from './components/register/register.module';
import { errorInterceptorProvider } from 'src/shared/http-interceptors/error-interceptor';
import { NotificationsService } from './../shared/services/notifications/notifications.service';
import { MatchesModule } from './components/matches/matches.module';
import { MessagesModule } from './components/messages/messages.module';
import { ListsModule } from './components/lists/lists.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavModule,
    HomeModule,
    RegisterModule,
    MatchesModule,
    MessagesModule,
    ListsModule
  ],
  providers: [
    errorInterceptorProvider,
    NotificationsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
