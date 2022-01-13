import { Component, Input } from '@angular/core';
import { Category } from '../../../core/models/category';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-products-in-category',
  templateUrl: './products-in-category.component.html',
  styleUrls: ['./products-in-category.component.scss'],
})
export class ProductsInCategoryComponent {
  @Input() category!: Category;
  @Input() products: Product[] = [];

  identifyProduct(_index: number, product: Product): number {
    return product.id;
  }
}
