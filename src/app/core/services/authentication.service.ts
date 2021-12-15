import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrationInput } from '../models/registration-input';
import { User, UserI } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  readonly currentUser$: Observable<User | null> = this.currentUser.asObservable();

  constructor(private http: HttpClient) {}

  login$(data: Credentials): Observable<AuthResponse> {
    return this.http
      .post<{ token: string; user: UserI }>(`${environment.apiUrl}/authenticate`, data)
      .pipe(map(({ token, user }) => ({ token, user: new User(user) })));
  }

  logout(): void {
    this.removeTokenSession();
    this.currentUser.next(null);
  }

  register$(data: RegistrationInput): Observable<User> {
    return this.http
      .post<UserI>(`${environment.apiUrl}/users`, data)
      .pipe(map((user: UserI) => new User(user)));
  }

  private removeTokenSession(): void {
    localStorage.removeItem('TS_TOKEN');
  }

  saveToken(token: string): void {
    this.setTokenSession(token);
  }

  setCurrentUser(user: User | null): void {
    this.currentUser.next(user);
  }

  private setTokenSession(token: string): void {
    localStorage.setItem('TS_TOKEN', token);
  }
}
