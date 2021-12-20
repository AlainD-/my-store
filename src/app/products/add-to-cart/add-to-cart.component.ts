import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent {
  @Input() productId!: number;
  quantity = 1;

  onAddToCart(): void {
    return;
  }
}
