import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order';
import { Product } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.scss'],
})
export class TotalPriceComponent implements OnInit {
  activeOrder$!: Observable<Order | null>;

  constructor(private orderService: OrderService, private productService: ProductService) {}

  ngOnInit(): void {
    this.activeOrder$ = this.orderService.activeOrder$;
  }

  total$(): Observable<number> {
    return this.activeOrder$.pipe(
      map(
        (order) =>
          order?.items
            ?.map(({ productId, quantity }) => {
              const product: Product | undefined = this.productService.productInfo(productId);
              const { price } = product ?? { price: 0 };
              return price * quantity;
            })
            .reduce((a, b) => a + b, 0) ?? 0
      )
    );
  }
}
