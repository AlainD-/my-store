import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { Product } from '../../core/models/product';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('table') table!: Table;
  products$!: Observable<Product[]>;
  selectedItems: Product[] = [];
  loading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.products$;
  }

  globalFilter(event: Event): void {
    this.table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
