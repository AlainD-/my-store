import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CategoryService } from '../../../../core/services/category.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { EditCategoryComponent } from './edit-category.component';

class MockCategoryService {}

class MockNotificationService {}

describe('EditCategoryComponent', () => {
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCategoryComponent],
      imports: [DialogModule, FormsModule],
      providers: [
        {
          provide: CategoryService,
          useClass: MockCategoryService,
        },
        {
          provide: NotificationService,
          useClass: MockNotificationService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
