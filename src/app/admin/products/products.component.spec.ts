import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ProductService } from '../../core/services/product.service';
import { ProductsComponent } from './products.component';

class MockProductService {}

@Component({
  selector: 'app-create-product',
})
class MockCreateProductComponent {}

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, MockCreateProductComponent],
      imports: [CardModule, TableModule],
      providers: [
        {
          provide: ProductService,
          useClass: MockProductService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
