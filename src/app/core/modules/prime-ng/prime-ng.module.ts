import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    AvatarModule,
    BadgeModule,
    ButtonModule,
    CardModule,
    ConfirmPopupModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    TableModule,
    TagModule,
    ToastModule,
  ],
})
export class PrimeNgModule {}
