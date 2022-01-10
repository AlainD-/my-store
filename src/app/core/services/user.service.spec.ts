import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

class MockHttpClient {}

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useClass: MockHttpClient,
        },
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
