import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from './modules/shared/services/token.service';
import { UserService } from './modules/shared/services/user.service';
import { ServiceWorkerService } from './modules/shared/services/serviceworker.service';
import packageInfo from '../../package.json';
import {ConfigService} from './modules/shared/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  version = packageInfo.version;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private translate: TranslateService,
    private serviceWorkerService: ServiceWorkerService,
    private configService: ConfigService // bootstrap the service here to retrive the config
  ) {
    this.serviceWorkerService.checkForUpdates();
    console.log('%c⧭ version ', 'color: #00861b; font-size: 16px; font-weight: 600', this.version);
  }

  ngOnInit(): void {
    if (this.tokenService.isTokenAlive()) {
      this.userService.setLoginStatus(true);
    }
    this.translate.setDefaultLang('tr')
    this.translate.use('tr')
  }
}
