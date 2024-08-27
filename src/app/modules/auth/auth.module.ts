import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ApprovalRequiredComponent } from './approval-required/approval-required.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ChangePasswordComponent, ApprovalRequiredComponent, ResetPasswordComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, SharedModule],
})
export class AuthModule { }
