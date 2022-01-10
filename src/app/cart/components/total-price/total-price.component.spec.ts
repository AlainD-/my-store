import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Order } from '../../../core/models/order';
import { OrderService } from '../../../core/services/order.service';
import { ProductService } from '../../../core/services/product.service';
import { TotalPriceComponent } from './total-price.component';

class MockOrderService {
  get activeOrder$(): Observable<Order | null> {
    return of(null);
  }
}

class MockProductService {}

describe('TotalPriceComponent', () => {
  let component: TotalPriceComponent;
  let fixture: ComponentFixture<TotalPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalPriceComponent],
      providers: [
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
    fixture = TestBed.createComponent(TotalPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
