import { TestBed } from '@angular/core/testing';
import { UserService } from '../services/user.service';
import { UserInfoPipe } from './user-info.pipe';

describe('UserInfoPipe', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = TestBed.inject(UserService);
  });

  it('create an instance', () => {
    const pipe = new UserInfoPipe(userService);
    expect(pipe).toBeTruthy();
  });
});
