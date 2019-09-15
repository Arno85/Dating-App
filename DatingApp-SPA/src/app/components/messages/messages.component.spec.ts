/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { UsersService } from 'src/app/services/users/users.service';
import { MessagesResolver } from 'src/app/resolvers/messages.resolver';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MessagesComponent
      ],
      imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        PaginationModule.forRoot(),
        ButtonsModule.forRoot(),
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        UsersService,
        MessagesResolver
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
