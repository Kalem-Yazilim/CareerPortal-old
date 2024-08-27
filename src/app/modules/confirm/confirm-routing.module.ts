import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [{ path: ':data', component: ConfirmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmRoutingModule {}
