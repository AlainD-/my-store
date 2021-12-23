import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { of, Subscription, switchMap, take } from 'rxjs';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NotificationService } from '../../../core/services/notification.service';
import { OrderService } from '../../../core/services/order.service';
import { ProductService } from '../../../core/services/product.service';
import { OrderItem } from '../../../core/models/order-item';
import { Product } from '../../../core/models/product';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit, OnDestroy {
  @Input() item!: OrderItem;
  quantity!: number;
  product!: Product | undefined;
  inProgress = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product = this.productService.productInfo(this.item.productId);
    this.quantity = this.item.quantity;
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  onQuantityChange(quantity: number): void {
    const user: User | null = this.authenticationService.stateGetCurrentUser();
    if (user && quantity !== this.item.quantity) {
      this.inProgress = true;
      this.subscriptions.add(
        this.orderService.activeOrder$
          .pipe(
            switchMap((order) =>
              order
                ? this.orderService.updateItemInUserOrder$(user, order, {
                    ...this.item,
                    quantity,
                  })
                : of(null)
            ),
            take(1)
          )
          .subscribe({
            next: (orderItem: OrderItem | null) => {
              if (orderItem) {
                this.orderService.stateUpdateItemInActiveOrder(orderItem);
                this.notificationService.notifySuccess(
                  'The product quantity has successfully been updated'
                );
                this.inProgress = false;
              }
            },
            error: (error) => {
              this.notificationService.notifyError(error);
              this.inProgress = false;
            },
          })
      );
    }
  }

  onRemove(): void {
    const user: User | null = this.authenticationService.stateGetCurrentUser();
    if (user) {
      this.inProgress = true;
      this.subscriptions.add(
        this.orderService.activeOrder$
          .pipe(
            switchMap((order) =>
              order ? this.orderService.removeItemFromUserOrder$(user, order, this.item) : of(null)
            ),
            take(1)
          )
          .subscribe({
            next: (orderItem: OrderItem | null) => {
              if (orderItem) {
                this.orderService.stateRemoveItemFromActiveOrder(orderItem);
                this.notificationService.notifySuccess('The product has successfully been removed');
                this.inProgress = false;
              }
            },
            error: (error) => {
              this.notificationService.notifyError(error);
              this.inProgress = false;
            },
          })
      );
    }
  }

  total(): number {
    return this.item.quantity * (this.product?.price ?? 0);
  }
}
