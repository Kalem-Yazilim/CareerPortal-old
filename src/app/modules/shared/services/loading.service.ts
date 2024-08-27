import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading$: Subject<boolean> = new Subject();
  public isLoading: boolean = false;

  constructor() {}

  start() {
    this.loading$.next(true);
    this.isLoading = true;
  }

  stop() {
    this.loading$.next(false);
    this.isLoading = false;
  }
}
