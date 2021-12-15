import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = [{ label: 'Products', icon: 'pi pi-list' }];
  }

  async onCart(): Promise<void> {
    await this.router.navigate(['/cart']);
  }

  async onSignIn(): Promise<void> {
    await this.router.navigate(['/login']);
  }

  async onSignUp(): Promise<void> {
    await this.router.navigate(['/register']);
  }
}
