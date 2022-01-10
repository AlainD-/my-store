import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryService } from '../../../../core/services/category.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ProductService } from '../../../../core/services/product.service';
import { EditProductComponent } from './edit-product.component';

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

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditProductComponent, MockProductImageComponent],
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
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
