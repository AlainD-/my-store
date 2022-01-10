import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AdminComponent } from './admin.component';
import { User } from '../../core/models/user';
import { NotificationService } from '../../core/services/notification.service';
import { UserService } from '../../core/services/user.service';

class MockNotificationService {}
class MockUserService {
  getAll$(): Observable<User[]> {
    return of([]);
  }
}

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: NotificationService,
          useClass: MockNotificationService,
        },
        {
          provide: UserService,
          useClass: MockUserService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
