import { Component, ViewChild, OnDestroy, Output, EventEmitter, OnInit } from '@angular/core';
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
export class SubmitCartFormComponent implements OnInit, OnDestroy {
  @Output() orderCompleted: EventEmitter<Order> = new EventEmitter<Order>();
  @ViewChild('form', { static: false }) form!: NgForm;
  submitted = false;
  shipping!: { name: string; address: string; cardNumber: string };
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.resetForm();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  private resetForm(): void {
    this.shipping = {
      name: '',
      address: '',
      cardNumber: '',
    };
    this.submitted = false;
    if (this.form) {
      this.form.reset();
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
