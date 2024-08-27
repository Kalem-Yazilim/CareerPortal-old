import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PreviewResumeComponent } from './preview-resume/preview-resume.component';
import { ResumeFormComponent } from './resume-form/resume-form.component';
import { ResumesRoutingModule } from './resumes-routing.module';
import { ResumesComponent } from './resumes.component';
import { NewEducationComponent } from './tab-components/personnel-cv-education/new-education/new-education.component';
import { PersonnelCvEducationComponent } from './tab-components/personnel-cv-education/personnel-cv-education.component';
import { PersonnelCvFileComponent } from './tab-components/personnel-cv-file/personnel-cv-file.component';
import { NewQualityComponent } from './tab-components/personnel-cv-job-quality/new-quality/new-quality.component';
import { PersonnelCvJobQualityComponent } from './tab-components/personnel-cv-job-quality/personnel-cv-job-quality.component';
import { NewLanguageComponent } from './tab-components/personnel-cv-language/new-language/new-language.component';
import { PersonnelCvLanguageComponent } from './tab-components/personnel-cv-language/personnel-cv-language.component';
import { NewReferansComponent } from './tab-components/personnel-cv-last-job-reference/new-referans/new-referans.component';
import { PersonnelCvLastJobReferenceComponent } from './tab-components/personnel-cv-last-job-reference/personnel-cv-last-job-reference.component';
import { NewLastJobComponent } from './tab-components/personnel-cv-last-job/new-last-job/new-last-job.component';
import { PersonnelCvLastJobComponent } from './tab-components/personnel-cv-last-job/personnel-cv-last-job.component';
import { PersonnelCvComponent } from './tab-components/personnel-cv/personnel-cv.component';
import { NewFileComponent } from './tab-components/personnel-cv-file/new-file/new-file.component';

@NgModule({
  declarations: [
    ResumesComponent,
    PreviewResumeComponent,
    ResumeFormComponent,
    PersonnelCvComponent,
    PersonnelCvEducationComponent,
    PersonnelCvLanguageComponent,
    PersonnelCvLastJobComponent,
    PersonnelCvLastJobReferenceComponent,
    PersonnelCvJobQualityComponent,
    PersonnelCvFileComponent,
    NewLastJobComponent,
    NewReferansComponent,
    NewQualityComponent,
    NewEducationComponent,
    NewLanguageComponent,
    NewFileComponent,
  ],
  imports: [
    CommonModule,
    ResumesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ResumesModule {}
