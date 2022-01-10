import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';

class MockHttpClient {}

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useClass: MockHttpClient,
        },
      ],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
