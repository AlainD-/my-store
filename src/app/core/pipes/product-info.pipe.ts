import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Pipe({ name: 'productInfo' })
export class ProductInfoPipe implements PipeTransform {
  constructor(private productService: ProductService) {}

  transform(productId: number, prop: keyof Product): number | string {
    const product: Product | undefined = this.productService.productInfo(productId);
    const fallBack = `product-${productId}`;
    return product ? product[prop] ?? fallBack : fallBack;
  }
}
