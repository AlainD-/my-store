import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { IsAuthenticatedDirective } from './is-authenticated.directive';

class MockAuthenticationService {
  get currentUser$(): Observable<User | null> {
    return of(null);
  }
}

class MockForAuthenticatedAuthenticationService {
  get currentUser$(): Observable<User | null> {
    return of(new User({ id: 1, firstName: '', lastName: '', email: '', isAdmin: 0 }));
  }
}

@Component({
  template: '<div *appIsAuthenticated id="testDiv">authorized content</div>',
})
class HostComponent {}

describe('IsAuthenticatedDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let div: HTMLDivElement | null;

  describe('IsAuthenticatedDirective > Non Authenticated user', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [IsAuthenticatedDirective, HostComponent],
        providers: [
          {
            provide: AuthenticationService,
            useClass: MockAuthenticationService,
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
    });

    it('should not display the div initially', () => {
      div = (fixture.debugElement.nativeElement as HTMLDivElement).querySelector('#testDiv');
      expect(div).toBe(null);
    });
  });

  describe('IsAuthenticatedDirective > Authenticated user', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [IsAuthenticatedDirective, HostComponent],
        providers: [
          {
            provide: AuthenticationService,
            useClass: MockForAuthenticatedAuthenticationService,
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
    });

    it('should display the div for an authenticated user', () => {
      div = (fixture.debugElement.nativeElement as HTMLDivElement).querySelector('#testDiv');
      expect(div).toBeTruthy();
      expect(div?.textContent).toBe('authorized content');
    });
  });
});
