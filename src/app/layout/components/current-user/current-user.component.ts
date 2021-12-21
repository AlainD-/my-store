import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, Subscription, switchMap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent implements OnInit, OnDestroy {
  currentUser$!: Observable<User | null>;
  menuItems!: MenuItem[];
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
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  getMenu({ fullName }: User): MenuItem[] {
    return [
      {
        label: `Signed in as ${fullName}`,
        items: [
          { label: 'Your profile', icon: 'pi pi-user', routerLink: ['/profile'] },
          { label: 'Sign out', icon: 'pi pi-power-off', command: () => this.onLogout() },
        ],
      },
    ];
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

  async onCart(): Promise<void> {
    await this.router.navigate(['/cart']);
  }

  async onLogout(): Promise<void> {
    this.authenticationService.logout();
    await this.router.navigate(['/']);
  }
}
