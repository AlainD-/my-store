import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  readonly categories$: Observable<Category[]> = this.categories.asObservable();

  constructor(private http: HttpClient) {}

  categoryInfo(categoryId: number): Category | undefined {
    return this.categories.getValue().find(({ id }) => id === categoryId);
  }

  create$(data: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(`${environment.apiUrl}/categories`, data);
  }

  delete$(id: number): Observable<Category> {
    return this.http.delete<Category>(`${environment.apiUrl}/categories/${id}`);
  }

  getAll$(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  getCategory$(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/categories/${id}`);
  }

  update$(id: number, data: Category): Observable<Category> {
    return this.http.put<Category>(`${environment.apiUrl}/categories/${id}`, data);
  }

  stateAddCategory(category: Category): void {
    this.stateSetCategories([...this.stateGetCategories(), category]);
  }

  stateGetCategories(): Category[] {
    return this.categories.getValue();
  }

  stateRemoveCategory(category: Category): void {
    this.stateSetCategories(this.stateGetCategories().filter((item) => item.id !== category.id));
  }

  stateSetCategories(categories: Category[]): void {
    this.categories.next(categories);
  }

  stateUpdateCategory(category: Category): void {
    this.stateSetCategories(
      this.stateGetCategories().map((item) =>
        item.id === category.id ? { ...item, ...category } : item
      )
    );
  }
}
