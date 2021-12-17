import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from './core/services/category.service';
import { NotificationService } from './core/services/notification.service';
import { ProductService } from './core/services/product.service';

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
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
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
          this.categoryService.setCategories(categories);
        },
        error: (error) => this.notificationService.notifyError(error),
      })
    );
  }

  private initProducts(): void {
    this.subscriptions.add(
      this.productService.getAll$().subscribe({
        next: (products) => {
          this.productService.setProducts(products);
        },
        error: (error) => this.notificationService.notifyError(error),
      })
    );
  }
}
