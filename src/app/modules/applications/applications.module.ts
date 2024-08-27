import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { NewApplicationComponent } from './new-application/new-application.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewComponent } from './review/review.component';
import { ApplyFormComponent } from './apply-form/apply-form.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ApplicationsComponent,
    NewApplicationComponent,
    ReviewComponent,
    ApplyFormComponent,
  ],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
  ],
})
export class ApplicationsModule {}
