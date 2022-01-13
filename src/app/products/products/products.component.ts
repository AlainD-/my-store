import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../core/models/category';
import { Product } from '../../core/models/product';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$!: Observable<Product[]>;
  categories$!: Observable<Category[]>;

  constructor(private categoryService: CategoryService, private productService: ProductService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.categories$;
    this.products$ = this.productService.products$;
  }

  categoryProducts(products: Product[], categoryId: number): Product[] {
    return products.filter((product) => product.categoryId === categoryId);
  }

  identifyCategory(_index: number, category: Category): number {
    return category.id;
  }
}
