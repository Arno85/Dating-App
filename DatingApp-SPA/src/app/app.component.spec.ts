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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        errorInterceptorProvider
     ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
