/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersDetailComponent } from './members-detail.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { TabsModule } from 'ngx-bootstrap';
import { UsersLogicService } from 'src/app/services/users/logic/users-logic.service';
import { UsersDataService } from 'src/app/services/users/data/users-data.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('MembersDetailComponent', () => {
  let component: MembersDetailComponent;
  let fixture: ComponentFixture<MembersDetailComponent>;

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
        MembersDetailComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
