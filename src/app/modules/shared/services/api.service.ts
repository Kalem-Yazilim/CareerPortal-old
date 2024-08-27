import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ODataServiceFactory } from 'angular-odata';
import { lastValueFrom, Observable } from 'rxjs';
import {ConfigService, IConfigObject} from './config.service';
import { TokenService } from './token.service';

export class ResponseModel<T> {
  count: number | null;
  data: T;

  constructor(data: T, count: number = 0) {
    this.data = data;
    this.count = count;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  oDataApiUrl: string;

  constructor(
    private factory: ODataServiceFactory,
    private token: TokenService,
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.configService.Config$.subscribe(
      (configs: IConfigObject) => {
        if (configs) {
        this.oDataApiUrl = configs.odata_url;
      }
    });
  }

  get httpHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token.getToken(),
    });
    return headers;
  }

  httpRequest(url: string, query: any = () => {},count:boolean=false) {
    let entityFactory = this.factory.entitySet<any>(url);
    let entityService = entityFactory.entities();
    entityFactory.api.serviceRootUrl = this.oDataApiUrl;

    return entityService
      .clone()
      .query(query)
      .fetch({
        withCount: count,
        headers: {
          Authorization: 'Bearer ' + this.token.getToken(),
        },
      });
  }

  async getList<T>(url: string, query: any = () => {}) {
    let entityFactory = this.factory.entitySet<T>(url);
    let entityService = entityFactory.entities();
    entityFactory.api.serviceRootUrl = this.oDataApiUrl;

    let response$ = entityService
      .clone()
      .query(query)
      .fetch({
        withCount: true,
        headers: {
          Authorization: 'Bearer ' + this.token.getToken(),
        },
      });

    let { entities, annots } = await lastValueFrom(response$);

    return new ResponseModel<T>(entities as T, annots.count ? annots.count : 0);
  }

  getSingleReq(url: string, oid: number, query: any = () => {}) {
    let entityFactory = this.factory.entitySet<any>(url);
    let entityService = entityFactory.entities();
    entityFactory.api.serviceRootUrl = this.oDataApiUrl;

    return entityService
      .clone()
      .entity(oid)
      .query(query)
      .fetch({
        //withCount: true,
        headers: {
          Authorization: 'Bearer ' + this.token.getToken(),
        },
      });
  }

  async getSingle<T>(url: string, oid: number, query: any = () => {}) {
    let entityFactory = this.factory.entitySet<T>(url);
    let entityService = entityFactory.entities();
    entityFactory.api.serviceRootUrl = this.oDataApiUrl;

    let response$ = entityService
      .clone()
      .entity(oid)
      .query(query)
      .fetchEntity({
        headers: {
          Authorization: 'Bearer ' + this.token.getToken(),
        },
      });
    let response = await lastValueFrom(response$);

    return new ResponseModel<T>(response as T);
  }

  put(url: string, body: any): Observable<any> {
    const headers = this.httpHeaders;
    return this.http.put(this.oDataApiUrl + url, body, { headers });
  }
  get(url: string): Observable<any> {
    const headers = this.httpHeaders;
    return this.http.get(this.oDataApiUrl + url, { headers });
  }

  post<T>(url: string, body?: object): Observable<T> {
    const headers = this.httpHeaders;
    return this.http.post<T>(this.oDataApiUrl + url, body, {
      headers,
    });
  }

  delete(url: string): Observable<any> {
    const headers = this.httpHeaders;
    return this.http.delete(this.oDataApiUrl + url, {
      headers,
    });
  }
}
