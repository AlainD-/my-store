import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order';
import { OrderItem } from '../../core/models/order-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  activeOrder$!: Observable<Order | null>;
  completedOrder: Order | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.activeOrder$ = this.orderService.activeOrder$;
  }

  identifyOrderItem(_index: number, item: OrderItem): number {
    return item.id;
  }

  onOrderCompleted(order: Order): void {
    this.completedOrder = order;
  }
}
