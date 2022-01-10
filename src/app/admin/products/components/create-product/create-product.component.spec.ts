import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryService } from '../../../../core/services/category.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ProductService } from '../../../../core/services/product.service';
import { CreateProductComponent } from './create-product.component';

class MockCategoryService {}
class MockNotificationService {}
class MockProductService {}

@Component({
  selector: 'app-product-image',
})
class MockProductImageComponent {
  @Input() imageUrl!: string | undefined | null;
  @Input() heightPx = 200;
}

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProductComponent, MockProductImageComponent],
      imports: [DialogModule, DropdownModule, FormsModule],
      providers: [
        {
          provide: CategoryService,
          useClass: MockCategoryService,
        },
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        {
          provide: NotificationService,
          useClass: MockNotificationService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
