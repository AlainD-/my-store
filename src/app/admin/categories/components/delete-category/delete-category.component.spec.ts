import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { CategoryService } from '../../../../core/services/category.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { DeleteCategoryComponent } from './delete-category.component';

class MockCategoryService {}

class MockConfirmationService {}

class MockNotificationService {}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'p-confirmPopup',
})
class MockConfirmPopupComponent {}

describe('DeleteCategoryComponent', () => {
  let component: DeleteCategoryComponent;
  let fixture: ComponentFixture<DeleteCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCategoryComponent, MockConfirmPopupComponent],
      providers: [
        {
          provide: CategoryService,
          useClass: MockCategoryService,
        },
        {
          provide: ConfirmationService,
          useClass: MockConfirmationService,
        },
        {
          provide: NotificationService,
          useClass: MockNotificationService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
