import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { CategoryInfoPipe } from './category-info.pipe';

const categories: Category[] = [{ id: 1, name: 'Category' }];

@Component({
  template: '{{ categoryId | categoryInfo: "name" }}',
})
class HostComponent {
  categoryId = 1;
}

describe('CategoryInfoPipe', () => {
  let fixture: ComponentFixture<HostComponent>;
  let MockCategoryService: Pick<CategoryService, 'categoryInfo'>;

  beforeEach(async () => {
    MockCategoryService = {
      categoryInfo(categoryId: number): Category | undefined {
        return categories.find((items) => items.id === categoryId);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [CategoryInfoPipe, HostComponent],
      providers: [{ provide: CategoryService, useValue: MockCategoryService }],
    }).compileComponents();

    MockCategoryService = TestBed.inject(CategoryService);
    fixture = TestBed.createComponent(HostComponent);
  });

  it('should return the name property', () => {
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toBe('Category');
  });
});
