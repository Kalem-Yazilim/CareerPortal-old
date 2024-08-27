import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import CONFIG from '../../../../config/config.json';

export interface IConfigObject {
  auth_url: string;
  odata_url: string;
  logo_colored_base64: string;
  logo_white_base64: string;
  about_us_page_url: string;
  carrier_page_url: string;
  carrier_page_title: string;
  leave_form_base64: string;
  footer_copyright_text: string;
  instagram_url: string;
  twitter_url: string;
  facebook_url: string;
  allowed_nav_menu_keys: number[];
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  configObject: IConfigObject = CONFIG;
  private configSubject: BehaviorSubject<any> = new BehaviorSubject(this.configObject);

  Config$ = this.configSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.SetConfigUrls();
  }

  public SetConfigUrls() {
    this.httpClient.get('config/config.json').subscribe({
      next: (response: any) => {
        if (response) {
          this.configObject = response;
          this.configSubject.next(this.configObject);
        }
      },
    });
  }
}
