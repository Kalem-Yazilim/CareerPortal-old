import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ODataServiceFactory } from 'angular-odata';
import { User } from 'src/app/models/user.interface';
import { ApiService } from '../../shared/services/api.service';
import {ConfigService, IConfigObject} from '../../shared/services/config.service';
import { TokenService } from '../../shared/services/token.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent {
  userName: string | null;
  model: Partial<User> = {};
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'section-label',
          template:
            '<h2 class="my-4"><strong>Kişisel Bilgiler :</strong></h2><hr />',
        },
        {
          className: 'col-6',
          key: 'UserName',
          type: 'input',
          props: {
            label: 'Kullanıcı Adı',
            disabled: true,
          },
        },
        {
          className: 'col-6',
          key: 'ImageDataTemp',
          type: 'input',
          props: {
            type: 'file',
            label: 'Profil Resmi',
            change: (f, $event) => this.changeFile($event),
          },
        },
        {
          className: 'col-6',
          key: 'FirstName',
          type: 'input',
          focus: true,
          props: {
            label: 'isim',
          },
        },
        {
          className: 'col-6',
          key: 'SurName',
          type: 'input',
          props: {
            label: 'Soyisim',
          },
        },
        {
          className: 'col-6',
          key: 'EmailAddress',
          type: 'input',
          props: {
            label: 'Email',
            disabled: true,
          },
        },
        {
          className: 'col-6',
          key: 'PhoneNumber',
          type: 'phoneNumber',
          props: {
            label: 'Telefon Numarası',
          },
        },
      ],
    },
  ];

  oDataApiUrl: string;

  constructor(
    private factory: ODataServiceFactory,
    private token: TokenService,
    private userService: UserService,
    private api: ApiService,
    private configService: ConfigService
  ) {
    this.configService.Config$.subscribe(
      (configs: IConfigObject) => {
        if (configs?.odata_url) {
          this.oDataApiUrl = configs.odata_url;
          this.getUser();
        }
      });


  }

  getUser() {
    this.userName = this.userService.userName;
    if (this.userName) {
      let usersService = this.factory.entitySet<any>('PortalUsers');
      let users = usersService.entities();
      users.api.serviceRootUrl = this.oDataApiUrl;

      users
        .clone()
        .query((q) => q.filter(({ e }) => e().eq('UserName', this.userName)))
        .fetch({
          headers: {
            Authorization: 'Bearer ' + this.token.getToken(),
          },
        })
        .subscribe(({ entities }) => {
          if (entities) {
            this.model = (entities as User[])[0];
          }
        });
    }
  }

  changeFile(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    var reader = e.target;
    let [fileType, base64file] = (reader.result as string).split(',');
    this.model.ImageData = base64file;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.form.valid) {
      if ((this.model as any).ImageDataTemp)
        delete (this.model as any).ImageDataTemp;

      this.api.put(`PortalUsers/${this.model.Oid}`, this.model).subscribe({
        next: (res) => {
          window.location.reload();
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
