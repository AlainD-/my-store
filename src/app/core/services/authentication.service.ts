import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrationInput } from '../models/registration-input';
import { User, UserI } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  register$(data: RegistrationInput): Observable<User> {
    return this.http
      .post<UserI>(`${environment.apiUrl}/users`, data)
      .pipe(map((user: UserI) => new User(user)));
  }
}
