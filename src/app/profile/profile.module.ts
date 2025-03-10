import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, FormsModule, CoreModule, ProfileRoutingModule],
})
export class ProfileModule {}
