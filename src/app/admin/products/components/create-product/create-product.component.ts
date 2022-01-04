import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../../../core/models/category';
import { Product } from '../../../../core/models/product';
import { CategoryService } from '../../../../core/services/category.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  @ViewChild('form', { static: false }) form!: NgForm;
  showDialog = false;
  submitted = false;
  newItem!: Partial<Product>;
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

  create(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.subscriptions.add(
        this.productService.create$(this.form.value as Partial<Product>).subscribe({
          next: (product: Product) => {
            this.productService.stateAddProduct(product);
            this.resetForm();
          },
          error: (error) => {
            this.notificationService.notifyError(error);
          },
        })
      );
    }
  }

  onNew(): void {
    this.showDialog = true;
  }

  onClose(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.showDialog = false;
    this.newItem = { name: '', price: 0, categoryId: 0, imageUrl: undefined };
    this.submitted = false;
    if (this.form) {
      this.form.reset();
    }
  }
}
