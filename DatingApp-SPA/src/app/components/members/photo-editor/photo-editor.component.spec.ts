/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoEditorComponent } from './photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { UsersService } from 'src/app/services/users/users.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('PhotoEditorComponent', () => {
  let component: PhotoEditorComponent;
  let fixture: ComponentFixture<PhotoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PhotoEditorComponent
      ],
      providers: [
        UsersService
      ],
      imports: [
        HttpClientModule,
        FileUploadModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
