import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Pipe({ name: 'productName' })
export class ProductNamePipe implements PipeTransform {
  constructor(private productService: ProductService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(productId: number, ..._args: unknown[]): string {
    const product: Product | undefined = this.productService.productInfo(productId);
    return product?.name ?? `product-${productId}`;
  }
}
