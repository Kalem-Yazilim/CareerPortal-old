import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AuthService } from '../../shared/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loading = false;
  form = new FormGroup({});
  model: any = {};
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
          key: 'EmailAddress',
          type: 'input',
          focus: true,
          wrappers: ['form-field-horizontal'],
          props: {
            label: 'E-Posta',
            required: true,
          },
          validators: {
            validation: ['email'],
          },
        },
        {
          key: 'FirstName',
          type: 'input',
          wrappers: ['form-field-horizontal'],
          props: {
            label: 'İsim',
            required: true,
          },
        },
        {
          key: 'SurName',
          type: 'input',
          wrappers: ['form-field-horizontal'],
          props: {
            label: 'Soyisim',
            required: true,
          },
        },
        {
          key: 'PhoneNumber',
          type: 'phoneNumber',
          props: {
            label: 'Telefon',
            required: true,
            horizontal: true,
          },
        },
        {
          key: 'Password',
          type: 'input',
          wrappers: ['form-field-horizontal'],
          props: {
            label: 'Şifre',
            type: 'password',
            required: true,
            minLength: 6,
          },
        },
        {
          key: 'passwordConfirm',
          type: 'input',
          wrappers: ['form-field-horizontal'],
          props: {
            type: 'password',
            label: 'Şifre Tekrar',
            required: true,
          },
        },
        {
          className: 'row my-2',
          key: 'kvkk',
          type: 'kvkkInput',
          props: {
            required: true,
          },
          hooks: {
            onInit: (field) => {
              field.formControl?.valueChanges.subscribe((res) => {
                if (res == false) field.formControl?.setValue(null);
              });
            },
          },
        },
      ],
    },
  ];

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  submit() {
    if (this.loading) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.authService.register(this.model).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (res: any) => {
        this.notification.show(
          'Üye kaydınız başarıyla tamamlandı! Lütfen E-Posta adresinizden hesabınızı onaylayın!',
          'success',
          'bottom-right',
          'Başarılı!'
        );
        this.router.navigateByUrl('auth/login');
      },
      error: (err) => {
        if (
          err &&
          (err.error.value as string).includes(
            'Kullanıcı Adı daha önce kullanılmıştır'
          )
        ) {
          this.notification.show(
            'Yeni kayıt başarısız! Aynı e-Posta adresiyle kayıt mevcut.',
            'error',
            'bottom-right',
            'Kullanıcı mevcut!'
          );
        } else {
          this.notification.show(
            'Kayıt tamamlanamadı!',
            'error',
            'bottom-right',
            'Başarısız!'
          );
        }
      },
    });
  }
}
