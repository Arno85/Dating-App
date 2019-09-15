import { TabsModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { UsersService } from 'src/app/services/users/users.service';

import { HttpClientModule } from '@angular/common/http';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MembersDetailComponent } from './members-detail.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { Photo } from 'src/app/models/photo.model';

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
        UsersService
      ],
      declarations: [
        MembersDetailComponent,
        TimeAgoPipe
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
