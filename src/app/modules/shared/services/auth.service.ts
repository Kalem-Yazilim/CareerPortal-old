import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import {ConfigService, IConfigObject} from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authApiUrl: string;
  oDataApiUrl: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private http: HttpClient,
    private tokenService: TokenService,
    private configService: ConfigService,
  ) {
    this.configService.Config$.subscribe(
      (configs: IConfigObject) => {
        if (configs) {
          this.authApiUrl = configs.auth_url;
          this.oDataApiUrl = configs.odata_url;
        }
      }
    );
  }

  login(username?: string, password?: string, rememberMe: boolean = false) {
    const body = {
      userName: username,
      password: password,
      loginUserType: 2, //for PortalUser
    };

    return this.http.post(this.authApiUrl, body);
  }

  logout() {
    // TODO: logout method
    this.userService.setLoginStatus(false);
    this.router.navigateByUrl('');
    this.tokenService.logout();
  }

  register(userModel: any) {
    delete userModel.passwordConfirm;
    delete userModel.kvkk;
    userModel.IsActive = true;
    return this.http.post(this.oDataApiUrl + 'PortalUsers', userModel);
  }

  resetPassword(emailAddress: string) {
    const body = {
      mailAddress: emailAddress,
    };
    return this.http.post(this.authApiUrl + '/RememberPortalUserPassword', body);
  }
}
