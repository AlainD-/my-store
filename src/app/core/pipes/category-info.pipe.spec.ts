import { TestBed } from '@angular/core/testing';
import { CategoryService } from '../services/category.service';
import { CategoryInfoPipe } from './category-info.pipe';

describe('CategoryInfoPipe', () => {
  let categoryService: CategoryService;

  beforeEach(() => {
    categoryService = TestBed.inject(CategoryService);
  });

  it('create an instance', () => {
    const pipe = new CategoryInfoPipe(categoryService);
    expect(pipe).toBeTruthy();
  });
});
