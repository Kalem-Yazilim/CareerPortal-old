import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subscription, finalize } from 'rxjs';
import { Login } from 'src/app/models/login.interface';
import { AuthService } from '../../shared/services/auth.service';
import { TokenService } from '../../shared/services/token.service';
import { UserService } from '../../shared/services/user.service';
import { NotificationService } from '../../shared/services/notification.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ConfigService, IConfigObject} from '../../shared/services/config.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginSubs: Subscription;

  form = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      focus: true,
      props: {
        label: 'E-Posta',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      props: {
        label: 'Şifre',
        required: true,
        type: 'password',
      },
    },
  ];

  login_model: Partial<Login> = {};
  active = 1;
  progcess: boolean = false;

  logoColoredUrl: SafeResourceUrl;

  constructor(
    private authService: AuthService,
    private route: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private notification: NotificationService,
    private _sanitizer: DomSanitizer,
    private configService: ConfigService
  ) {
    this.configService.Config$.subscribe(
      (configs: IConfigObject) => {
        if (configs) {
          this.logoColoredUrl =
            this._sanitizer.bypassSecurityTrustResourceUrl(configs.logo_colored_base64);
        }
      }
    );
  }

  submit() {
    if (this.form.valid) {
      this.progcess = true;
      this.loginSubs = this.authService
        .login(this.login_model.username, this.login_model.password)
        .pipe(
          finalize(() => {
            this.progcess = false;
          })
        )
        .subscribe({
          next: (res: any) => {
            this.route.navigateByUrl('');
            this.userService.setLoginStatus(true);
            this.tokenService.login(res);
          },
          error: (err) => {
            if (
              err.error &&
              err.error ==
                'Giriş yapılan hesap doğrulanmamıştır. Lütfen hesabınızı doğrulayın.'
            ) {
              this.notification.show(
                'Hesabınızın onaylanması için e-Posta adresine gelen onay bağlantısına tıklamanz gerekli.',
                'error',
                'bottom-right',
                'Onaysız Hesap'
              );
              this.route.navigateByUrl('/auth/login');
            } else {
              this.notification.show(
                'Geçersiz giriş.',
                'error',
                'bottom-right'
              );
            }
          },
        });
    }
  }

  ngOnDestroy(): void {
    if (this.loginSubs) this.loginSubs.unsubscribe();
  }
}
