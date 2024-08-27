import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { SingleComponent } from './single/single.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':oid', component: SingleComponent },
];

@NgModule({
  declarations: [ListComponent, SingleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    SharedModule,
  ],
})
export class JobAnnouncementModule {}
