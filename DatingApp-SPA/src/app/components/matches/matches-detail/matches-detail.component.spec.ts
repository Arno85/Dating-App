/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MatchesDetailComponent } from './matches-detail.component';

describe('MatchesDetailComponent', () => {
  let component: MatchesDetailComponent;
  let fixture: ComponentFixture<MatchesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxGalleryModule,
        TabsModule.forRoot()
      ],
      declarations: [ MatchesDetailComponent ]
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
