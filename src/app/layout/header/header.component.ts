import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];
  currentUser$!: Observable<User | null>;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.items = [{ label: 'Products', icon: 'pi pi-list', routerLink: ['/products'] }];
    this.currentUser$ = this.authenticationService.currentUser$;
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  async onCart(): Promise<void> {
    await this.router.navigate(['/cart']);
  }

  async onLogout(): Promise<void> {
    this.authenticationService.logout();
    await this.router.navigate(['/']);
  }

  async onSignIn(): Promise<void> {
    await this.router.navigate(['/login']);
  }

  async onSignUp(): Promise<void> {
    await this.router.navigate(['/register']);
  }
}
