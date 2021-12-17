import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  readonly products$: Observable<Product[]> = this.products.asObservable();

  constructor(private http: HttpClient) {}

  getAll$(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  getProduct$(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  getProducts(): Product[] {
    return this.products.getValue();
  }

  productInfo(productId: number): Product | undefined {
    return this.products.getValue().find(({ id }) => id === productId);
  }

  setProducts(products: Product[]): void {
    this.products.next(products);
  }
}
