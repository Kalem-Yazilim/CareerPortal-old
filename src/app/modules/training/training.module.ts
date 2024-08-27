import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  NgbAccordionModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from '../shared/shared.module';
import { DocumentComponent } from './content-components/document/document.component';
import { ExamTimerComponent } from './content-components/exam/exam-timer/exam-timer.component';
import { ExamComponent } from './content-components/exam/exam.component';
import { OverviewComponent } from './content-components/overview/overview.component';
import { SlideshowComponent } from './content-components/slideshow/slideshow.component';
import { SummaryComponent } from './content-components/summary/summary.component';
import { VideoPlayerComponent } from './content-components/video-player/video-player.component';
import { CourseComponent } from './course/course.component';
import { TrainingRoutingModule } from './training-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    CourseComponent,
    VideoPlayerComponent,
    ExamComponent,
    SlideshowComponent,
    OverviewComponent,
    SummaryComponent,
    ExamTimerComponent,
    DocumentComponent,
    CategoryListComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    FormsModule,
    NgbProgressbarModule,
    NgbAccordionModule,
    NgbAccordionModule,
    SharedModule,
    PdfViewerModule
  ],
})
export class TrainingModule {}
