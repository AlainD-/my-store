import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserI } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  readonly users$: Observable<User[]> = this.users.asObservable();

  constructor(private http: HttpClient) {}

  delete$(id: number): Observable<User> {
    return this.http
      .delete<UserI>(`${environment.apiUrl}/users/${id}`)
      .pipe(map((user) => new User(user)));
  }

  getAll$(): Observable<User[]> {
    return this.http
      .get<UserI[]>(`${environment.apiUrl}/users`)
      .pipe(map((users) => users.map((user) => new User(user))));
  }

  getUser$(id: number): Observable<User> {
    return this.http
      .get<UserI>(`${environment.apiUrl}/users/${id}`)
      .pipe(map((user) => new User(user)));
  }

  update$(id: number, data: UserI): Observable<User> {
    return this.http
      .put<UserI>(`${environment.apiUrl}/users/${id}`, data)
      .pipe(map((user) => new User(user)));
  }

  userInfo(userId: number): User | undefined {
    return this.users.getValue().find(({ id }) => id === userId);
  }

  stateAddUser(user: User): void {
    this.stateSetUsers([...this.stateGetUsers(), user]);
  }

  stateGetUsers(): User[] {
    return this.users.getValue();
  }

  stateRemoveUser(user: User): void {
    this.stateSetUsers(this.stateGetUsers().filter((item) => item.id !== user.id));
  }

  stateSetUsers(users: User[]): void {
    this.users.next(users);
  }

  stateUpdateUser(user: User): void {
    this.stateSetUsers(
      this.stateGetUsers().map((item) =>
        item.id === user.id ? new User({ ...item, ...user }) : item
      )
    );
  }
}
