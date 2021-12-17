import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss'],
})
export class ProductImageComponent {
  @Input() imageUrl!: string | undefined | null;
  @Input() heightPx = 200;

  get heightStyle(): string {
    return `${this.heightPx}px`;
  }
}
