import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, Subscription, switchMap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order';
import { OrderItem } from '../../../core/models/order-item';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent implements OnInit, OnDestroy {
  currentUser$!: Observable<User | null>;
  menuItems!: MenuItem[];
  adminMenuItems!: MenuItem[];
  activeOrder$!: Observable<Order | null>;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.authenticationService.currentUser$;
    this.activeOrder$ = this.orderService.activeOrder$;
    this.initActiveOrder();
    this.initMenu();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  private initActiveOrder(): void {
    if (!this.orderService.stateGetActiveOrder()) {
      this.subscriptions.add(
        this.authenticationService.currentUser$
          .pipe(
            switchMap((user) => (user ? this.orderService.getUserActiveOrders$(user) : of([]))),
            map((orders) => (orders.length ? orders[0] : null))
          )
          .subscribe({
            next: (order) => {
              this.orderService.stateSetActiveOrder(order);
            },
          })
      );
    }
  }

  private initMenu(): void {
    this.currentUser$.subscribe({
      next: (user) => {
        this.menuItems = [
          {
            label: user ? `Signed in as ${user.fullName}` : 'Signed in',
            items: [
              { label: 'Your profile', icon: 'pi pi-user', routerLink: ['/profile'] },
              { label: 'Sign out', icon: 'pi pi-power-off', command: () => this.onLogout() },
            ],
          },
        ];
        this.adminMenuItems = user?.isAdmin
          ? [
              {
                label: 'Administration',
                items: [
                  { label: 'Categories', routerLink: ['/admin/categories'] },
                  { label: 'Products', routerLink: ['/admin/products'] },
                  { label: 'Orders', routerLink: ['/admin/orders'] },
                  { label: 'Users', routerLink: ['/admin/users'] },
                ],
              },
            ]
          : [];
      },
    });
  }

  itemsInCart(): string {
    const items: OrderItem[] = this.orderService.stateGetActiveOrder()?.items ?? [];
    const quantities = items.map(({ quantity }) => quantity);
    const nb: number = quantities.reduce((a, b) => a + b, 0);
    return nb ? `${nb}` : '';
  }

  async onCart(): Promise<void> {
    await this.router.navigate(['/cart']);
  }

  async onLogout(): Promise<void> {
    this.authenticationService.logout();
    await this.router.navigate(['/']);
  }
}
