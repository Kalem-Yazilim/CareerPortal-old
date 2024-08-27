import { ConfirmModule } from './../confirm/confirm.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent as jobAnnouncementList } from '../job-announcement/list/list.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  /*
  { path: '', component: MainLayoutComponent }, */
  {
    path: '',
    component: jobAnnouncementList,
  },
  {
    path: 'confirm',
    loadChildren: () =>
      import('../confirm/confirm.module').then((m) => m.ConfirmModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'applications',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../applications/applications.module').then(
        (m) => m.ApplicationsModule
      ),
  },
  {
    path: 'resumes',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../resumes/resumes.module').then((m) => m.ResumesModule),
  },
  {
    path: 'training',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../training/training.module').then((m) => m.TrainingModule),
  },
  {
    path: 'JobAnnouncements',
    loadChildren: () =>
      import('../job-announcement/job-announcement.module').then(
        (m) => m.JobAnnouncementModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainLayoutRoutingModule {}
