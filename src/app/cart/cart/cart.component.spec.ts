import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';

import { OrderService } from '../../core/services/order.service';
import { CartComponent } from './cart.component';

class MockOrderService {}

@Component({
  selector: 'app-empty-cart',
})
class MockEmptyCartComponent {}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent, MockEmptyCartComponent],
      imports: [CardModule, MessagesModule],
      providers: [
        {
          provide: OrderService,
          useClass: MockOrderService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
