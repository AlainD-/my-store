import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ProductInfoPipe } from './product-info.pipe';

const products: Product[] = [{ id: 1, name: 'Product', price: 0, categoryId: 0 }];

@Component({
  template: '{{ productId | productInfo: "name" }}',
})
class HostComponent {
  productId = 1;
}

describe('ProductInfoPipe', () => {
  let fixture: ComponentFixture<HostComponent>;
  let MockProductService: Pick<ProductService, 'productInfo'>;

  beforeEach(async () => {
    MockProductService = {
      productInfo(productId: number): Product | undefined {
        return products.find((items) => items.id === productId);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [ProductInfoPipe, HostComponent],
      providers: [{ provide: ProductService, useValue: MockProductService }],
    }).compileComponents();

    MockProductService = TestBed.inject(ProductService);
    fixture = TestBed.createComponent(HostComponent);
  });

  it('should return the name property', () => {
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toBe('Product');
  });
});
