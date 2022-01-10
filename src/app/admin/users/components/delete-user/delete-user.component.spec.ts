import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { User } from '../../../../core/models/user';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { UserService } from '../../../../core/services/user.service';
import { DeleteUserComponent } from './delete-user.component';

class MockAuthenticationService {
  stateGetCurrentUser(): User | null {
    return null;
  }
}

class MockConfirmationService {}
class MockNotificationService {}
class MockUserService {}

describe('DeleteUserComponent', () => {
  let component: DeleteUserComponent;
  let fixture: ComponentFixture<DeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteUserComponent],
      imports: [TagModule],
      providers: [
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService,
        },
        {
          provide: ConfirmationService,
          useClass: MockConfirmationService,
        },
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
    fixture = TestBed.createComponent(DeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
