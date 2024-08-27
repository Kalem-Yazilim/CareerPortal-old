import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { JobAnnouncementModule } from './modules/job-announcement/job-announcement.module';
import { MainLayoutModule } from './modules/main-layout/main-layout.module';
import { LoadingInterceptor } from './modules/shared/interceptors/loading.interceptor';
import { SharedModule } from './modules/shared/shared.module';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmModule } from './modules/confirm/confirm.module';
import { AuthInterceptor } from './modules/shared/interceptors/auth.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HammerModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    JobAnnouncementModule,
    AuthModule,
    MainLayoutModule,
    BrowserAnimationsModule,
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ConfirmModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}

// TODO:
/***
 *  İlan sayfası - Anasayfa (Giriş bileşeni dahil)
 *  {
 *    ANONYMOUS GET ilanlar - PersonnelJobAnnouncement > ilanlar
 *    ANONYMOUS GET ilan/:id
 *
 *    POST login
 *  }
 *  Üyelik sayfası {
 *    GET user
 *    POST user (register)
 *    PUT user
 *
 *    user {
 *      email,
 *      name,
 *      surName,
 *      tel,
 *      password,
 *      address,
 *      pictureUrl,
 *    }
 *
 *    POST profilePictureUpload
 *    POST changePassword
 * }
 *
 *  Başvuru ekranı (Özgeçmiş Seçme)
 *    POST jobApplication
 *  Başvurularım (Geçmiş başvuruları görüntüler - başvuru)
 *    GET jobApplications
 *    GET jobApplication/:id
 *
 *  Özgeçmişlerim (Özgeçmişleri listeler)
 *    GET personnelCVs{}
 *  Özgeçmiş (Düzenleme ve ekleme - Kademeli)
 *    GET personnelCV{}
 *    POST personnelCV{}
 *  Profilim Sayfası
 *    GET user
 *    POST user
 *  Eğitimler sayfası (Eğitimleri listeler)
 *    GET educationLists
 *
 *    Eğitim sayfası (Eğitim içerikleriyle etkileşir)
 *      GET educationList/:id
 *      Üniteleri ve içerikleri
 *      baseClass{
 *        parts,
 *        contents:ContentClass,
 *        title,
 *        id,
 *        progressPercent,
 *       }
 *
 *      contentClass {
 *      contentType,
 *      progressPercent,
 *      contentId,
 *      data: => different for each contentType
 *      }
 *      Video
 *      Sınav
 *      Sunum
 *      Özet
 *      Genel bakış
 * ***/
