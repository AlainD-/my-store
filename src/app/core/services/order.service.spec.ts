import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { OrderService } from './order.service';

class MockHttpClient {}

class MockNotificationService {}

describe('OrderService', () => {
  let service: OrderService;

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
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
