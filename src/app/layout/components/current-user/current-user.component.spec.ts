import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Observable, of } from 'rxjs';
import { User } from '../../../core/models/user';
import { Order } from '../../../core/models/order';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { OrderService } from '../../../core/services/order.service';
import { CurrentUserComponent } from './current-user.component';

class MockAuthenticationService {
  get currentUser$(): Observable<User | null> {
    return of(null);
  }
}

class MockOrderService {
  stateGetActiveOrder(): Order | null {
    return null;
  }
}

describe('CurrentUserComponent', () => {
  let component: CurrentUserComponent;
  let fixture: ComponentFixture<CurrentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentUserComponent],
      imports: [RouterTestingModule.withRoutes([]), ButtonModule, AvatarModule],
      providers: [
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService,
        },
        {
          provide: OrderService,
          useClass: MockOrderService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
