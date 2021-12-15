import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../core/models/user';
import { AuthenticationService } from '../core/services/authentication.service';
import { NotificationService } from '../core/services/notification.service';
import { RegistrationInput } from './../core/models/registration-input';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) form!: NgForm;
  account!: RegistrationInput;
  submitted = false;
  createdAccount!: User;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.account = { email: '', firstName: '', lastName: '', password: '' };
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  onRegister(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.subscriptions.add(
        this.authenticationService.register$(this.form.value as RegistrationInput).subscribe({
          next: (user: User) => {
            this.createdAccount = user;
            this.notificationService.notifySuccess(
              `The account for ${user.fullName} has successfully been created`
            );
          },
          error: (error: unknown) => {
            this.notificationService.notifyError(error);
          },
        })
      );
    }
  }
}
