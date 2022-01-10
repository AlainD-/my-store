import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NotificationService } from '../../../core/services/notification.service';
import { OrderService } from '../../../core/services/order.service';
import { SubmitCartFormComponent } from './submit-cart-form.component';

class MockAuthenticationService {}
class MockNotificationService {}
class MockOrderService {}

describe('SubmitCartFormComponent', () => {
  let component: SubmitCartFormComponent;
  let fixture: ComponentFixture<SubmitCartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmitCartFormComponent],
      imports: [FormsModule],
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
