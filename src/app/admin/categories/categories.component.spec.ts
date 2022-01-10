import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CategoryService } from '../../core/services/category.service';
import { CategoriesComponent } from './categories.component';

class MockCategoryService {}

@Component({
  selector: 'app-create-category',
  template: '<p></p>',
})
class MockCreateCategoryComponent {}

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent, MockCreateCategoryComponent],
      imports: [CardModule, TableModule],
      providers: [
        {
          provide: CategoryService,
          useClass: MockCategoryService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
