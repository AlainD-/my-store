import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss'],
})
export class ProductImageComponent {
  @Input() imageUrl!: string | undefined | null;
  @Input() heightPx = 200;
  @Input() clickable = false;
  @Input() preview = false;

  get heightStyle(): string {
    return `${this.heightPx}px`;
  }

  get sHeightPx(): string {
    return `${this.heightPx}`;
  }

  get imageClass(): string {
    const shadow = 'shadow-4';
    const baseClass = this.imageUrl ? 'image-product' : 'image-placeholder';
    return this.clickable ? `${baseClass} ${shadow} image-clickable` : `${baseClass} ${shadow}`;
  }
}
