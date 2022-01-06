import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Pipe({
  name: 'userInfo',
})
export class UserInfoPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  transform(userId: number, prop: keyof User): unknown {
    const user: User | undefined = this.userService.userInfo(userId);
    return user ? user[prop] : `user-${userId}`;
  }
}
