import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';

class MockHttpClient {}

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useClass: MockHttpClient,
        },
      ],
    });
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
