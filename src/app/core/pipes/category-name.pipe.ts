import { Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from './../models/category';

@Pipe({ name: 'categoryName' })
export class CategoryNamePipe implements PipeTransform {
  constructor(private categoryService: CategoryService) {}

  transform(categoryId: number, ..._args: unknown[]): string {
    const category: Category | undefined = this.categoryService.categoryInfo(categoryId);
    return category?.name ?? `category-${categoryId}`;
  }
}
