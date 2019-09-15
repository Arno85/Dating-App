/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MembersCardComponent } from './members-card.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from 'src/app/services/users/users.service';
import { Photo } from 'src/app/models/photo.model';

describe('MembersCardComponent', () => {
  let component: MembersCardComponent;
  let fixture: ComponentFixture<MembersCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        UsersService
      ],
      declarations: [
        MembersCardComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
