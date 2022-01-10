import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserInfoPipe } from './user-info.pipe';

const users: User[] = [
  new User({ id: 1, firstName: 'First', lastName: 'Last', email: 'a@a.a', isAdmin: 0 }),
];

@Component({
  template: '{{ userId | userInfo: "fullName" }}',
})
class HostComponent {
  userId = 1;
}

describe('UserInfoPipe', () => {
  let fixture: ComponentFixture<HostComponent>;
  let MockUserService: Pick<UserService, 'userInfo'>;

  beforeEach(async () => {
    MockUserService = {
      userInfo(userId: number): User | undefined {
        return users.find((items) => items.id === userId);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [UserInfoPipe, HostComponent],
      providers: [{ provide: UserService, useValue: MockUserService }],
    }).compileComponents();

    MockUserService = TestBed.inject(UserService);
    fixture = TestBed.createComponent(HostComponent);
  });

  it('should return the fullName property', () => {
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).textContent).toBe('First Last');
  });
});
