import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Table } from 'primeng/table';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild('table') table!: Table;
  users$!: Observable<User[]>;
  selectedItems: User[] = [];
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.users$;
  }

  globalFilter(event: Event): void {
    this.table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
