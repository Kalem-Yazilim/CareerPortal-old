import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from '../../shared/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnDestroy {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'emailAddress',
      type: 'input',
      focus: true,
      props: {
        label: 'Email adresiniz',
        type: 'email',
        required: true,
      },
      validators: {
        validation: ['email'],
      },
    },
  ];

  resetPasswordSub?: Subscription;

  constructor(
    private authService: AuthService,
    private notification: NotificationService
  ) {}

  submit() {
    if (this.form.valid) {
      this.authService.resetPassword(this.model.emailAddress).subscribe({
        next: (res: any) => {
          if (res) {
            console.log(res);
            this.notification.show(res.result);
          }
        },
        error: (err: any) => {
          if (err.error.caption === 'HATA')
            this.notification.show(err.error.detail, 'error');
          else console.error(err.error);
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.resetPasswordSub) {
      this.resetPasswordSub.unsubscribe();
    }
  }
}
