import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  @ViewChild('table') table!: Table;
  orders$!: Observable<Order[]>;
  loading = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders$ = this.orderService.getAll$();
  }

  globalFilter(event: Event): void {
    this.table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
