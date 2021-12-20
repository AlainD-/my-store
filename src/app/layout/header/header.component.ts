import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.items = [{ label: 'Products', icon: 'pi pi-list', routerLink: ['/products'] }];
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
