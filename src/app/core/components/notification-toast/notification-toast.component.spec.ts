import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NotificationToastComponent } from './notification-toast.component';

describe('NotificationToastComponent', () => {
  let component: NotificationToastComponent;
  let fixture: ComponentFixture<NotificationToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationToastComponent],
      imports: [ToastModule],
      providers: [MessageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
