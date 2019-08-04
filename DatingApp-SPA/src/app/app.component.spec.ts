import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NavModule } from './components/nav/nav.module';
import { HomeModule } from './components/home/home.module';
import { RegisterModule } from './components/register/register.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { errorInterceptorProvider } from 'src/shared/http-interceptors/error-interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { MembersModule } from './components/members/members.module';
import { MessagesModule } from './components/messages/messages.module';
import { ListsModule } from './components/lists/lists.module';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { AuthGuard } from 'src/shared/guards/auth/auth.guard';
import { APP_BASE_HREF } from '@angular/common';

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
