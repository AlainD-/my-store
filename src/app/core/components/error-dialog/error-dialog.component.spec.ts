import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogModule } from 'primeng/dialog';
import { Observable, of } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { ErrorDialogComponent } from './error-dialog.component';

class MockNotificationService {
  get error$(): Observable<string | null> {
    return of(null);
  }
}

describe('ErrorDialogComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorDialogComponent],
      imports: [DialogModule],
      providers: [
        {
          provide: NotificationService,
          useClass: MockNotificationService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
