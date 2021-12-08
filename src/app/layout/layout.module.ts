import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, MainComponent],
  imports: [CommonModule],
  exports: [MainComponent],
})
export class LayoutModule {}
