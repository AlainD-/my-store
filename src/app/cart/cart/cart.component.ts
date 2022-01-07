import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFrown } from '@fortawesome/free-regular-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { NotificationService } from '../../core/services/notification.service';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models/order';
import { OrderItem } from '../../core/models/order-item';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) form!: NgForm;
  activeOrder$!: Observable<Order | null>;
  submitted = false;
  completedOrder: Order | null = null;
  shipping: { name: string; address: string } = { name: '', address: '' };
  faFaceFrown: IconDefinition = faFrown;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.activeOrder$ = this.orderService.activeOrder$;
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  identifyOrderItem(_index: number, item: OrderItem): number {
    return item.id;
  }

  onSubmit(): void {
    this.submitted = true;
    const currentUser: User | null = this.authenticationService.stateGetCurrentUser();
    const activeOrder: Order | null = this.orderService.stateGetActiveOrder();
    if (this.form.valid && currentUser && activeOrder) {
      this.subscriptions.add(
        this.orderService
          .updateUserOrders$(currentUser, { ...activeOrder, status: 'complete' })
          .subscribe({
            next: (order) => {
              this.completedOrder = order;
              this.orderService.stateSetActiveOrder(null);
            },
            error: (error) => {
              this.notificationService.notifyError(error);
            },
          })
      );
    }
  }
}
