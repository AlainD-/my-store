import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesModule } from 'primeng/messages';
import { OrderCompletedComponent } from './order-completed.component';

describe('OrderCompletedComponent', () => {
  let component: OrderCompletedComponent;
  let fixture: ComponentFixture<OrderCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderCompletedComponent],
      imports: [MessagesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
