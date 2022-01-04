import { Component, Input, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Product } from '../../../../core/models/product';
import { NotificationService } from '../../../../core/services/notification.service';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent implements OnDestroy {
  @Input() productId!: number;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private confirmationService: ConfirmationService,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  deleteItem(event: Event): void {
    this.confirmationService.confirm({
      target: event.target ?? undefined,
      message: 'Are you sure you want to delete this product?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes, delete!',
      rejectLabel: 'No, cancel',
      defaultFocus: 'reject',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.subscriptions.add(
          this.productService.delete$(this.productId).subscribe({
            next: (product: Product) => {
              this.productService.stateRemoveProduct(product);
            },
            error: (error) => {
              this.notificationService.notifyError(error);
            },
          })
        );
      },
    });
  }
}
