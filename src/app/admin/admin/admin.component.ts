import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../core/services/notification.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  constructor(private notificationService: NotificationService, private userService: UserService) {}

  ngOnInit(): void {
    this.initUsers();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  private initUsers(): void {
    this.subscriptions.add(
      this.userService.getAll$().subscribe({
        next: (users) => {
          this.userService.stateSetUsers(users);
        },
        error: (error) => {
          this.notificationService.notifyError(error);
        },
      })
    );
  }
}
