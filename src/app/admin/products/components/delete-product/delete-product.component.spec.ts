import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { NotificationService } from '../../../../core/services/notification.service';
import { ProductService } from '../../../../core/services/product.service';
import { DeleteProductComponent } from './delete-product.component';

class MockConfirmationService {}
class MockNotificationService {}
class MockProductService {}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'p-confirmPopup',
})
class MockConfirmPopupComponent {}

describe('DeleteProductComponent', () => {
  let component: DeleteProductComponent;
  let fixture: ComponentFixture<DeleteProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteProductComponent, MockConfirmPopupComponent],
      providers: [
        {
          provide: ConfirmationService,
          useClass: MockConfirmationService,
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
    fixture = TestBed.createComponent(DeleteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
