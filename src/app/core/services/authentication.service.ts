import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SESSION_CURRENT_USER, SESSION_TOKEN } from '../constants/config.constants';
import { RegistrationInput } from '../models/registration-input';
import { User, UserI } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { Credentials } from '../models/credentials';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  readonly currentUser$: Observable<User | null> = this.currentUser.asObservable();

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  isLoggedIn(): boolean {
    return this.currentUser.getValue() !== null;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  login$(data: Credentials): Observable<AuthResponse> {
    return this.http
      .post<{ token: string; user: UserI }>(`${environment.apiUrl}/authenticate`, data)
      .pipe(map(({ token, user }) => ({ token, user: new User(user) })));
  }

  logout(): void {
    this.removeTokenSession();
    this.setCurrentUser(null);
  }

  register$(data: RegistrationInput): Observable<User> {
    return this.http
      .post<UserI>(`${environment.apiUrl}/users`, data)
      .pipe(map((user: UserI) => new User(user)));
  }

  private removeTokenSession(): void {
    localStorage.removeItem(SESSION_TOKEN);
  }

  saveToken(token: string): void {
    this.setTokenSession(token);
  }

  setCurrentUser(user: User | null): void {
    this.currentUser.next(user);
    this.setCurrentUserSession(user);
  }

  private setCurrentUserSession(user: User | null): void {
    try {
      if (!user) {
        localStorage.removeItem(SESSION_CURRENT_USER);
      } else {
        localStorage.setItem(SESSION_CURRENT_USER, JSON.stringify(user));
      }
    } catch (error) {
      this.notificationService.notifyError(error);
    }
  }

  private setTokenSession(token: string): void {
    localStorage.setItem(SESSION_TOKEN, token);
  }
}
