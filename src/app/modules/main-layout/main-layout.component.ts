import {
  Component,
  ChangeDetectorRef,
  AfterContentChecked,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from 'src/app/route-animations';
import { LoadingService } from '../shared/services/loading.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [slideInAnimation],
})
export class MainLayoutComponent {
  constructor(
    public loadingService: LoadingService,
    private changeDetector: ChangeDetectorRef
  ) {}

  loading: boolean;
  loadingSubs: Subscription;

  ngAfterContentChecked(): void {
    this.loadingSubs = this.loadingService.loading$
      .pipe()
      .subscribe((status: boolean) => {
        this.loading = status;
        this.changeDetector.detectChanges();
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }
}
