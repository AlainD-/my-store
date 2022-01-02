import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnDestroy {
  @Input() userId!: number;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private confirmationService: ConfirmationService,
    private notificationService: NotificationService,
    private userService: UserService
  ) {}

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  deleteItem(event: Event): void {
    if (this.isCurrentUser()) {
      this.notificationService.notifyErrorWithMessage('You cannot delete your own admin account!');
    } else {
      this.confirmationService.confirm({
        target: event.target ?? undefined,
        message: 'Are you sure you want to delete this user?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Yes, delete!',
        rejectLabel: 'No, cancel',
        defaultFocus: 'reject',
        acceptButtonStyleClass: 'p-button-danger',
        accept: () => {
          this.subscriptions.add(
            this.userService.delete$(this.userId).subscribe({
              next: (user: User) => {
                this.userService.stateRemoveUser(user);
              },
              error: (error) => {
                this.notificationService.notifyError(error);
              },
            })
          );
        },
      });
    }
  }

  isCurrentUser(): boolean {
    return this.authenticationService.stateGetCurrentUser()?.id === this.userId;
  }
}
