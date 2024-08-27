import { ConfigService, IConfigObject } from './../../services/config.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ODataServiceFactory } from 'angular-odata';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.2s ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.2s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class NavComponent implements OnInit {
  prod = environment.production;
  loginStatus$: Observable<boolean>;
  fullscreenMenuOpen = false;
  url: string;
  profilImage: any;
  fullName: string = '';

  oDataApiUrl: string;
  logoWhiteUrl: SafeResourceUrl;

  constructor(
    public userService: UserService,
    private authService: AuthService,
    private router: ActivatedRoute,
    private factory: ODataServiceFactory,
    private token: TokenService,
    private api: ApiService,
    private configService: ConfigService,
    private _sanitizer: DomSanitizer
  ) {
    this.loginStatus$ = this.userService.loginStatus$;
    this.url = router.snapshot.url.join('/');

    this.configService.Config$.subscribe(
      (configs: IConfigObject) => {
        if (configs) {
          this.oDataApiUrl = configs.odata_url;
          this.logoWhiteUrl =
            this._sanitizer.bypassSecurityTrustResourceUrl(configs.logo_white_base64);
          this.getUser();
        }
      });
  }

  getUser() {
    if (this.userService.userName) {
      let usersService = this.factory.entitySet<any>('PortalUsers');
      let users = usersService.entities();
      users.api.serviceRootUrl = this.oDataApiUrl;

      users
        .clone()
        .query((q) =>
          q.filter(({ e }) => e().eq('UserName', this.userService.userName))
        )
        .fetch({
          headers: {
            Authorization: 'Bearer ' + this.token.getToken(),
          },
        })
        .subscribe(({ entities }) => {
          if (entities?.length > 0 && entities[0].ImageData) {
            console.log('entities[0].ImageData >> ', entities[0].ImageData);
            this.profilImage = `data:image;base64, ${
              (entities as User[])[0].ImageData
            }`;
          } else this.profilImage = 'assets/img/profile.png';
          this.fullName = `${(entities as User[])[0].FirstName} ${
            (entities as User[])[0].SurName
          }`;
        });
    }
  }

  fullscreenMenu() {
    this.fullscreenMenuOpen = !this.fullscreenMenuOpen;
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
