/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersEditComponent } from './members-edit.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule, TabsModule } from 'ngx-bootstrap';
import { TimeAgoPipe } from 'time-ago-pipe';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from 'src/app/services/users/users.service';
import { Photo } from 'src/app/models/photo.model';

describe('MembersEditComponent', () => {
  let component: MembersEditComponent;
  let fixture: ComponentFixture<MembersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MembersEditComponent,
        PhotoEditorComponent,
        TimeAgoPipe
      ],
      providers: [
        UsersService
      ],
      imports: [
        FormsModule,
        BsDatepickerModule.forRoot(),
        TabsModule.forRoot(),
        FileUploadModule,
        RouterTestingModule,
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
