import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User, UserI } from '../../core/models/user';
import { AuthenticationService } from '../../core/services/authentication.service';
import { NotificationService } from '../../core/services/notification.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) form!: NgForm;
  currentUser$!: Observable<User | null>;
  isEditing = false;
  submitted = false;
  profile!: UserI;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.authenticationService.currentUser$;
    this.resetEditing();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  onEditProfile(user: User): void {
    this.isEditing = true;
    this.profile = { ...user };
  }

  onUpdate(user: User): void {
    this.submitted = true;

    if (this.form.valid) {
      this.subscriptions.add(
        this.userService.update$(user.id, this.form.value as UserI).subscribe({
          next: (user: User) => {
            this.notificationService.notifySuccess('Your profile has successfully been updated');
            this.resetEditing();
            this.authenticationService.stateSetCurrentUser(user);
          },
          error: (error: unknown) => {
            this.notificationService.notifyError(error);
          },
        })
      );
    }
  }

  resetEditing(): void {
    this.isEditing = false;
    this.profile = { id: -1, email: '', firstName: '', lastName: '', isAdmin: 0 };
  }
}
