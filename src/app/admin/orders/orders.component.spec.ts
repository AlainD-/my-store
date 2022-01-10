import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Observable, of } from 'rxjs';
import { Order } from '../../core/models/order';
import { OrderService } from '../../core/services/order.service';
import { OrdersComponent } from './orders.component';

class MockOrderService {
  getAll$(): Observable<Order[]> {
    return of([]);
  }
}

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersComponent],
      imports: [TableModule, CardModule],
      providers: [
        {
          provide: OrderService,
          useClass: MockOrderService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
