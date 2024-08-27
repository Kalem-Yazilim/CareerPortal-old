import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ConfigService, IConfigObject} from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  oDataApiUrl: string;

  constructor(private http: HttpClient,
    private configService: ConfigService) {

    this.configService.Config$.subscribe(
      (configs: IConfigObject) => {
        if (configs?.odata_url) {
          this.oDataApiUrl = configs.odata_url;
        }
      }
    );
  }

  confirmMail(guid: string) {
    // /api/odata/PortalUsers/MailApprove(data=c287e08a-8aac-4a58-8091-84c8e2f92299)
    const url = `${this.oDataApiUrl}PortalUsers/MailApprove(data=${guid})`;
    return this.http.get(url);
  }
}
