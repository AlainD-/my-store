import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$!: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAll$();
  }

  identifyProduct(_index: number, product: Product): number {
    return product.id;
  }
}
