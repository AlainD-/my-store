import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { NotificationService } from '../../core/services/notification.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild('table') table!: Table;
  users$!: Observable<User[]>;
  selectedItems: User[] = [];
  loading = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private userService: UserService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.users$ = this.userService.users$;
    this.initUsers();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  globalFilter(event: Event): void {
    this.table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
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
