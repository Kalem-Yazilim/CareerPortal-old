import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalRequiredComponent } from './approval-required/approval-required.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/ChangePassword', component: ChangePasswordComponent },
  { path: 'auth/ApprovalRequired', component: ApprovalRequiredComponent },
  { path: 'auth/ResetPassword', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
