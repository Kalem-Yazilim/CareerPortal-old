import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AuthService } from '../../shared/services/auth.service';

export interface changePasswordVM {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
}
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  errorMessage: string;
  form = new FormGroup({});
  model: Partial<changePasswordVM> = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      validators: {
        validation: [
          { name: 'passwordMatch', options: { errorPath: 'passwordConfirm' } },
        ],
      },
      fieldGroup: [
        {
          key: 'oldPassword',
          type: 'input',
          focus: true,
          props: {
            label: 'Şifre',
            required: true,
            type: 'password',
          },
        },
        {
          key: 'password',
          type: 'input',
          props: {
            label: 'Yeni Şifre',
            type: 'password',
            required: true,
            minLength: 6,
          },
        },
        {
          key: 'passwordConfirm',
          type: 'input',
          props: {
            label: 'Yeni Şifre Tekrarı',
            required: true,
            type: 'password',
          },
        },
      ],
    },
  ];

  constructor(private authService: AuthService) {}

  submit() {
    if (this.form.valid) {
      if (this.model.newPassword == this.model.newPasswordConfirm) {
        console.log(this.model);
      } else this.setErrorMessage('Yeni Şifre Tekrarı aynı değil!');
    }
  }

  setErrorMessage(errorMessage: string) {
    this.errorMessage = errorMessage;
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }
}
