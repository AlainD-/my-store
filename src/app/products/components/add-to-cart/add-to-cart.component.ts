import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, of, Observable, tap, map, take } from 'rxjs';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NotificationService } from '../../../core/services/notification.service';
import { OrderItem } from '../../../core/models/order-item';
import { Order } from '../../../core/models/order';
import { User } from '../../../core/models/user';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent implements OnInit, OnDestroy {
  @Input() productId!: number;
  quantity = 1;
  quantities: number[] = [];
  inProgress = false;
  inTheCart$!: Observable<OrderItem | undefined>;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.inTheCart$ = this.orderService.activeOrder$.pipe(
      map((order) => order?.items?.find((item) => item.productId === this.productId))
    );
    for (let i = 1; i <= 100; i++) {
      this.quantities.push(i);
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  buttonIcon(): string {
    return this.inProgress ? 'pi pi-spin pi-spinner' : '';
  }

  buttonLabel(): string {
    return this.inProgress ? '...' : 'Add to cart';
  }

  onAddToCart(): void {
    const user: User | null = this.authenticationService.stateGetCurrentUser();
    if (user) {
      this.inProgress = true;
      // if there is no active cart, create 1 first
      const activeOrder: Order | null = this.orderService.stateGetActiveOrder();
      const activeOrder$: Observable<Order | null> = activeOrder
        ? this.orderService.activeOrder$
        : this.orderService.createUserOrders$(user).pipe(
            tap({
              next: (order) => {
                this.orderService.stateSetActiveOrder(order);
              },
            })
          );

      // Then add the product in the order
      this.subscriptions.add(
        activeOrder$
          .pipe(
            switchMap((order) =>
              order
                ? this.orderService.addItemToUserOrder$(user, order, {
                    productId: this.productId,
                    quantity: this.quantity,
                  })
                : of(null)
            ),
            take(1)
          )
          .subscribe({
            next: (orderItem: OrderItem | null) => {
              if (orderItem) {
                this.orderService.stateAddItemToActiveOrder(orderItem);
                this.notificationService.notifySuccess(
                  'The product has successfully been added to the order'
                );
              }
              this.inProgress = false;
            },
            error: (error) => {
              this.notificationService.notifyError(error);
              this.inProgress = false;
            },
          })
      );
    }
  }
}
