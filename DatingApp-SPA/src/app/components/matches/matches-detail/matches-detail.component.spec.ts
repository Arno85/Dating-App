/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MatchesDetailComponent } from './matches-detail.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { TabsModule } from 'ngx-bootstrap';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { UsersDataService } from 'src/app/services/users/data/users-data.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('MatchesDetailComponent', () => {
  let component: MatchesDetailComponent;
  let fixture: ComponentFixture<MatchesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxGalleryModule,
        TabsModule.forRoot(),
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        UsersLogicService,
        UsersDataService
      ],
      declarations: [
        MatchesDetailComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
