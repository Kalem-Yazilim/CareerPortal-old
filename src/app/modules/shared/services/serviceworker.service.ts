import { Inject, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { DOCUMENT } from '@angular/common';
import { filter, interval, map } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ServiceWorkerService {
  constructor(private swUpdate: SwUpdate, @Inject(DOCUMENT) private document: Document, private router: Router) {
    if (swUpdate.isEnabled) {
      interval( 5 * 60 * 1000).subscribe(() => swUpdate.checkForUpdate().then(() => console.log('checking for updates')));
    } else {
      console.log('Service Worker on this browser is not enabled!');
    }
  }

  public checkForUpdates(): void {
    this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(data => {
        if (this.router.url.includes('/auth')) {
          this.refresh();
        } else {
          swal
            .fire({
              title: 'Uyarı',
              text: 'Sitenin yeni bir sürümü mevcut. Güncellemek istiyor musunuz?',
              showCancelButton: true,
              confirmButtonColor: '#01abce',
              confirmButtonText: 'Şimdi Güncelle',
              cancelButtonText: 'Sonra Güncelle',
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.refresh();
              }
            });
        }
    });
  }

  private async refresh() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
