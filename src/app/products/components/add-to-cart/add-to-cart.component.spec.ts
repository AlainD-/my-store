import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Order } from '../../../core/models/order';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { OrderService } from '../../../core/services/order.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AddToCartComponent } from './add-to-cart.component';

class MockAuthenticationService {}
class MockOrderService {
  get activeOrder$(): Observable<Order | null> {
    return of(null);
  }
}
class MockNotificationService {}

describe('AddToCartComponent', () => {
  let component: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddToCartComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService,
        },
        {
          provide: OrderService,
          useClass: MockOrderService,
        },
        {
          provide: NotificationService,
          useClass: MockNotificationService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
