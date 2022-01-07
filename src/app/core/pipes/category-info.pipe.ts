import { Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Pipe({ name: 'categoryInfo' })
export class CategoryInfoPipe implements PipeTransform {
  constructor(private categoryService: CategoryService) {}

  transform(categoryId: number, prop: keyof Category): number | string {
    const category: Category | undefined = this.categoryService.categoryInfo(categoryId);
    return category ? category[prop] : `category-${categoryId}`;
  }
}
