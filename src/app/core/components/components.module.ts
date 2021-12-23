import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../modules/prime-ng/prime-ng.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { NotificationToastComponent } from './notification-toast/notification-toast.component';
import { ProductImageComponent } from './product-image/product-image.component';

@NgModule({
  declarations: [ErrorDialogComponent, NotificationToastComponent, ProductImageComponent],
  imports: [CommonModule, PrimeNgModule],
  exports: [ErrorDialogComponent, NotificationToastComponent, ProductImageComponent],
})
export class ComponentsModule {}
