import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { CoreModule } from '../core/core.module';
import { CurrentUserComponent } from './components/current-user/current-user.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, MainComponent, CurrentUserComponent],
  imports: [CommonModule, CoreModule],
  exports: [MainComponent],
})
export class LayoutModule {}
