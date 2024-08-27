import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { ConfirmRoutingModule } from './confirm-routing.module';

@NgModule({
  declarations: [ConfirmComponent],
  imports: [CommonModule, ConfirmRoutingModule],
})
export class ConfirmModule {}
