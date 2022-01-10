import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../services/authentication.service';
import { IsAuthenticatedGuard } from './is-authenticated.guard';

class MockAuthenticationService {}

describe('IsAuthenticatedGuard', () => {
  let guard: IsAuthenticatedGuard;

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
    guard = TestBed.inject(IsAuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
