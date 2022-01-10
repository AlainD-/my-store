import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

import { NotificationService } from './notification.service';

class MockMessageService {}

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MessageService,
          useClass: MockMessageService,
        },
      ],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
