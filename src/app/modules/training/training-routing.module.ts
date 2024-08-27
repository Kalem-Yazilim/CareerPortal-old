import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryListComponent
  },
  {
    path: ':categoryId',
    component: CategoryComponent
  },
  {
    path: ':categoryId/:courseId',
    component: CourseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
