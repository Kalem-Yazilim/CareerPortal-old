import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewResumeComponent } from './preview-resume/preview-resume.component';
import { ResumesComponent } from './resumes.component';
import { ResumeFormComponent } from './resume-form/resume-form.component';

const routes: Routes = [
  {
    path: '',
    component: ResumesComponent,
  },
  {
    path: 'preview/:oid',
    component: PreviewResumeComponent,
  },
  {
    path: 'update/:oid',
    component: ResumeFormComponent,
  },
  {
    path: 'new',
    component: ResumeFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumesRoutingModule {}
