import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-already-in-cart',
  templateUrl: './already-in-cart.component.html',
  styleUrls: ['./already-in-cart.component.scss'],
})
export class AlreadyInCartComponent {
  @Input() quantity!: number;

  message(): string {
    return `${this.quantity} added to the cart`;
  }
}
