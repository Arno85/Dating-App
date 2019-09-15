/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsComponent } from './lists.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { UsersService } from 'src/app/services/users/users.service';
import { MatchesListResolver } from 'src/app/resolvers/matches-list.resolver';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListsComponent
      ],
      imports: [
        FormsModule,
        SharedModule,
        PaginationModule.forRoot(),
        ButtonsModule.forRoot(),
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        UsersService,
        MatchesListResolver
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
