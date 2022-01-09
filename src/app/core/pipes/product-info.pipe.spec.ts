import { TestBed } from '@angular/core/testing';
import { ProductService } from '../services/product.service';
import { ProductInfoPipe } from './product-info.pipe';

describe('ProductInfoPipe', () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = TestBed.inject(ProductService);
  });

  it('create an instance', () => {
    const pipe = new ProductInfoPipe(productService);
    expect(pipe).toBeTruthy();
  });
});
