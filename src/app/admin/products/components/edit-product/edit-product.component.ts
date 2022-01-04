import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../../../core/models/category';
import { Product } from '../../../../core/models/product';
import { CategoryService } from '../../../../core/services/category.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @ViewChild('form', { static: false }) form!: NgForm;
  showDialog = false;
  submitted = false;
  editedItem!: Product;
  categories$!: Observable<Category[]>;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.categories$;
    this.resetForm();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  onEdit(): void {
    this.showDialog = true;
    this.editedItem = { ...this.product };
  }

  onClose(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.showDialog = false;
    this.editedItem = { id: -1, name: '', price: 0, categoryId: 0, imageUrl: undefined };
    this.submitted = false;
    if (this.form) {
      this.form.reset();
    }
  }

  update(): void {
    this.submitted = true;
    if (this.form.valid && this.editedItem.id > 0) {
      this.subscriptions.add(
        this.productService.update$(this.editedItem.id, this.editedItem).subscribe({
          next: (product: Product) => {
            this.productService.stateUpdateProduct(product);
            this.resetForm();
          },
          error: (error) => {
            this.notificationService.notifyError(error);
          },
        })
      );
    }
  }
}
