import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsComponent } from './applications.component';
import { ApplyFormComponent } from './apply-form/apply-form.component';
import { NewApplicationComponent } from './new-application/new-application.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', component: ApplicationsComponent },
  { path: 'new', component: NewApplicationComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'application', component: ApplicationsComponent },
  { path: 'review/:id', component: ReviewComponent },
  { path: 'apply/:appId', component: ApplyFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationsRoutingModule {}
