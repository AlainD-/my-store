import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { NotificationService } from './notification.service';

class MockHttpClient {}

class MockNotificationService {}

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useClass: MockHttpClient,
        },
        {
          provide: NotificationService,
          useClass: MockNotificationService,
        },
      ],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
