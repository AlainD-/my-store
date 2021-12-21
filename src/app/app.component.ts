import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from './core/services/category.service';
import { NotificationService } from './core/services/notification.service';
import { ProductService } from './core/services/product.service';
import { AuthenticationService } from './core/services/authentication.service';
import { SESSION_CURRENT_USER } from './core/constants/config.constants';
import { User, UserI } from './core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initCurrentUser();
    this.initCategories();
    this.initProducts();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  private initCategories(): void {
    this.subscriptions.add(
      this.categoryService.getAll$().subscribe({
        next: (categories) => {
          this.categoryService.stateSetCategories(categories);
        },
        error: (error) => this.notificationService.notifyError(error),
      })
    );
  }

  private initCurrentUser(): void {
    const storedUser: string | null = localStorage.getItem(SESSION_CURRENT_USER);
    const user: User | null = storedUser ? new User(JSON.parse(storedUser) as UserI) : null;
    this.authenticationService.stateSetCurrentUser(user);
  }

  private initProducts(): void {
    this.subscriptions.add(
      this.productService.getAll$().subscribe({
        next: (products) => {
          this.productService.stateSetProducts(products);
        },
        error: (error) => this.notificationService.notifyError(error),
      })
    );
  }
}
