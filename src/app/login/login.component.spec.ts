import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CardModule } from 'primeng/card';
import { AuthenticationService } from '../core/services/authentication.service';
import { NotificationService } from '../core/services/notification.service';
import { LoginComponent } from './login.component';

class MockAuthenticationService {}
class MockNotificationService {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule.withRoutes([]), FormsModule, CardModule],
      providers: [
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService,
        },
        {
          provide: NotificationService,
          useClass: MockNotificationService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
