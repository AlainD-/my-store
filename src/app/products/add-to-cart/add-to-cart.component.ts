import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent {
  @Input() productId!: number;
  quantity = 1;

  constructor(private authenticationService: AuthenticationService) {}

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  onAddToCart(): void {
    return;
  }
}
