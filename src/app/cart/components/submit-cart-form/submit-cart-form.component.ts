import { Component, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Order } from '../../../core/models/order';
import { User } from '../../../core/models/user';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { NotificationService } from '../../../core/services/notification.service';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-submit-cart-form',
  templateUrl: './submit-cart-form.component.html',
  styleUrls: ['./submit-cart-form.component.scss'],
})
export class SubmitCartFormComponent implements OnDestroy {
  @Output() orderCompleted: EventEmitter<Order> = new EventEmitter<Order>();
  @ViewChild('form', { static: false }) form!: NgForm;
  submitted = false;
  shipping: { name: string; address: string } = { name: '', address: '' };
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private orderService: OrderService
  ) {}

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
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
            next: (order: Order) => {
              this.orderCompleted.emit(order);
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
