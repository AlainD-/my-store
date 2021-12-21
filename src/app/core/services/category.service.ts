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

  getAll$(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  stateGetCategories(): Category[] {
    return this.categories.getValue();
  }

  getCategory$(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}/categories/${id}`);
  }

  stateSetCategories(categories: Category[]): void {
    this.categories.next(categories);
  }
}
