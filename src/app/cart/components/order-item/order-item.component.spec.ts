import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Product } from '../../../core/models/product';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NotificationService } from '../../../core/services/notification.service';
import { OrderService } from '../../../core/services/order.service';
import { ProductService } from '../../../core/services/product.service';
import { OrderItemComponent } from './order-item.component';

class MockAuthenticationService {}
class MockNotificationService {}
class MockOrderService {}

class MockProductService {
  productInfo(productId: number): Product | undefined {
    return { id: productId, name: '', categoryId: 0, price: 0 };
  }
}

@Component({
  selector: 'app-product-image',
})
class MockProductImageComponent {
  @Input() imageUrl!: string | undefined | null;
  @Input() heightPx = 200;
}

describe('OrderItemComponent', () => {
  let component: OrderItemComponent;
  let fixture: ComponentFixture<OrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderItemComponent, MockProductImageComponent],
      imports: [DropdownModule, FormsModule],
      providers: [
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService,
        },
        {
          provide: NotificationService,
          useClass: MockNotificationService,
        },
        {
          provide: OrderService,
          useClass: MockOrderService,
        },
        {
          provide: ProductService,
          useClass: MockProductService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemComponent);
    component = fixture.componentInstance;
    component.item = { id: 0, orderId: 0, productId: 0, quantity: 0 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
