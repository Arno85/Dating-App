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

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
   BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      NavModule,
      HomeModule,
      RegisterModule,
      BrowserAnimationsModule
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
