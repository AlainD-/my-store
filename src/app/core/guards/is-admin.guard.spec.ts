import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../services/authentication.service';
import { IsAdminGuard } from './is-admin.guard';

class MockAuthenticationService {}

describe('IsAdminGuard', () => {
  let guard: IsAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: AuthenticationService,
          useClass: MockAuthenticationService,
        },
      ],
    });
    guard = TestBed.inject(IsAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
