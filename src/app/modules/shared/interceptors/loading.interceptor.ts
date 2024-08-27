import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  activeConnections: number = 0;

  constructor(private loading: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let rule: boolean =
      request.url.includes('api/odata/EducationListExamParticipantMaterials') ||
      request.url.includes('api/odata/EducationListExamParticipants(');

    if (!rule) {
      if (this.activeConnections === 0) {
        this.loading.start();
      }

      this.activeConnections++;
    }

    return next.handle(request).pipe(
      finalize(() => {
        if (!rule) {
          this.activeConnections--;
          if (this.activeConnections === 0) {
            this.loading.stop();
          }
        }
      })
    );
  }
}
