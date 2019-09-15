/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';
import { MessagesService } from './messages.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Message.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessagesService
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should ...', inject([MessagesService], (service: MessagesService) => {
    expect(service).toBeTruthy();
  }));
});
