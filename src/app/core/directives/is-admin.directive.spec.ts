import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { IsAdminDirective } from './is-admin.directive';

class MockAuthenticationService {
  get currentUser$(): Observable<User | null> {
    return of(null);
  }
}

class MockForAdminAuthenticationService {
  get currentUser$(): Observable<User | null> {
    return of(new User({ id: 1, firstName: '', lastName: '', email: '', isAdmin: 1 }));
  }
}

@Component({
  template: '<div *appIsAdmin id="testDiv">admin content</div>',
})
class HostComponent {}

describe('IsAdminDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let div: HTMLDivElement | null;

  describe('IsAdminDirective > Non Admin user', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [IsAdminDirective, HostComponent],
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

  describe('IsAdminDirective > Admin user', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [IsAdminDirective, HostComponent],
        providers: [
          {
            provide: AuthenticationService,
            useClass: MockForAdminAuthenticationService,
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
    });

    it('should display the div for an admin', () => {
      div = (fixture.debugElement.nativeElement as HTMLDivElement).querySelector('#testDiv');
      expect(div).toBeTruthy();
      expect(div?.textContent).toBe('admin content');
    });
  });
});
