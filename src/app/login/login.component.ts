import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Credentials } from '../core/models/credentials';
import { AuthenticationService } from '../core/services/authentication.service';
import { NotificationService } from '../core/services/notification.service';
import { AuthResponse } from './../core/models/auth-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) form!: NgForm;
  credentials!: Credentials;
  submitted = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.credentials = { email: '', password: '' };
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  onLogin(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.subscriptions.add(
        this.authenticationService.login$(this.form.value as Credentials).subscribe({
          next: async ({ token, user }: AuthResponse) => {
            this.authenticationService.saveToken(token);
            this.authenticationService.stateSetCurrentUser(user);
            await this.router.navigate(['/products']);
          },
          error: (error: unknown) => {
            this.notificationService.notifyError(error);
          },
        })
      );
    }
  }
}
