import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CardModule } from 'primeng/card';
import { ProductCardComponent } from './product-card.component';

@Component({
  selector: 'app-product-image',
})
class MockProductImageComponent {
  @Input() imageUrl!: string | undefined | null;
  @Input() heightPx = 200;
  @Input() clickable = false;
}

@Component({
  selector: 'app-add-to-cart',
})
class MockAddToCartComponent {
  @Input() productId!: number;
}

@Pipe({ name: 'categoryInfo' })
export class MockCategoryInfoPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(_categoryId: number, _prop: string): string {
    return '';
  }
}

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductCardComponent,
        MockAddToCartComponent,
        MockCategoryInfoPipe,
        MockProductImageComponent,
      ],
      imports: [RouterTestingModule.withRoutes([]), CardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = { id: 0, name: '', categoryId: 0, price: 0 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
