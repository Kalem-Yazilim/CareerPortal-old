import { ConfigService, IConfigObject } from './../shared/services/config.service';
import { Component, OnInit } from '@angular/core';
import { ODataServiceFactory } from 'angular-odata';
import { User } from 'src/app/models/user.interface';
import { ApiService } from '../shared/services/api.service';
import { TokenService } from '../shared/services/token.service';
import { UserService } from '../shared/services/user.service';
import { DeleteAccComponent } from './delete-acc/delete-acc.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  tabs = [
    { title: 'Kişisel Bilgiler', component: ProfileInfoComponent },
    { title: 'Şifremi Değiştir', url: '/auth/ChangePassword' },
    { title: 'Hesabımı Sil', component: DeleteAccComponent },
  ];

  activeTabIndex = 0;
  activeComponent: any;
  activeContentId = 0;
  profilImage: any;

  oDataApiUrl: string;

  constructor(
    private factory: ODataServiceFactory,
    private token: TokenService,
    private user: UserService,
    private api: ApiService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.activeComponent = ProfileInfoComponent;
    this.configService.Config$.subscribe(
      (configs: IConfigObject) => {
        if (configs?.odata_url) {
          this.oDataApiUrl = configs.odata_url;
          this.getUser();
        }
      });
  }

  getUser() {
    if (this.user.userName) {
      let usersService = this.factory.entitySet<any>('PortalUsers');
      let users = usersService.entities();
      users.api.serviceRootUrl = this.oDataApiUrl;

      users
        .clone()
        .query((q) =>
          q.filter(({ e }) => e().eq('UserName', this.user.userName))
        )
        .fetch({
          headers: {
            Authorization: 'Bearer ' + this.token.getToken(),
          },
        })
        .subscribe(({ entities }) => {
          if (entities && entities[0] && entities[0].ImageData) {
            this.profilImage = `data:image;base64, ${
              (entities as User[])[0].ImageData
            }`;
          } else this.profilImage = '/assets/img/profile.png';
        });
    }
  }

  loadTab(component: any, tabIndex: number, data?: any) {
    this.activeComponent = component;
    this.activeTabIndex = tabIndex;
  }
}
