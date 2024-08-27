import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DeleteAccComponent } from './delete-acc/delete-acc.component';
import { ProfileFilesComponent } from './profile-files/profile-files.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfilePrefComponent } from './profile-pref/profile-pref.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
    ProfilePrefComponent,
    DeleteAccComponent,
    ProfileFilesComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
