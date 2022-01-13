import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sortBy } from 'lodash/fp';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  readonly products$: Observable<Product[]> = this.products
    .asObservable()
    .pipe(map((items) => sortBy<Product>(['categoryId', 'name'])(items)));

  constructor(private http: HttpClient) {}

  create$(data: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/products`, data);
  }

  delete$(id: number): Observable<Product> {
    return this.http.delete<Product>(`${environment.apiUrl}/products/${id}`);
  }

  getAll$(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  getProduct$(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  productInfo(productId: number): Product | undefined {
    return this.products.getValue().find(({ id }) => id === productId);
  }

  update$(id: number, data: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.apiUrl}/products/${id}`, data);
  }

  stateAddProduct(product: Product): void {
    this.stateSetProducts([...this.stateGetProducts(), product]);
  }

  stateGetProducts(): Product[] {
    return this.products.getValue();
  }

  stateRemoveProduct(product: Product): void {
    this.stateSetProducts(this.stateGetProducts().filter((item) => item.id !== product.id));
  }

  stateSetProducts(products: Product[]): void {
    this.products.next(products);
  }

  stateUpdateProduct(product: Product): void {
    this.stateSetProducts(
      this.stateGetProducts().map((item) =>
        item.id === product.id ? { ...item, ...product } : item
      )
    );
  }
}
