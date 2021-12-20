import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser$!: Observable<User | null>;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.currentUser$ = this.authenticationService.currentUser$;
  }
}
