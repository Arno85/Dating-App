/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MatchesListComponent } from './matches-list.component';
import { MatchesCardComponent } from './matches-card/matches-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { UsersDataService } from 'src/app/services/users/data/users-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('MatchesListComponent', () => {
  let component: MatchesListComponent;
  let fixture: ComponentFixture<MatchesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        MatchesListComponent,
        MatchesCardComponent
      ],
      providers: [
        UsersLogicService,
        UsersDataService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
