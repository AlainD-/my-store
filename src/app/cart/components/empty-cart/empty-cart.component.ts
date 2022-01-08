import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFrown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.scss'],
})
export class EmptyCartComponent {
  faFaceFrown: IconDefinition = faFrown;
}
