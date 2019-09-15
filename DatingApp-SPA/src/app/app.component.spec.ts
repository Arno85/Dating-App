import { AuthGuard } from 'src/shared/guards/auth/auth.guard';
import { errorInterceptorProvider } from 'src/shared/http-interceptors/error-interceptor';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';

import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
     ],
     imports: [
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      JwtModule,
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
      AuthGuard,
      {
        provide: APP_BASE_HREF,
        useValue: '/'
      }
     ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
