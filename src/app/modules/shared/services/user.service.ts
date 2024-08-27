import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const USER_KEY = environment.USER_KEY;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _loginStatus = new BehaviorSubject<boolean>(false);
  readonly loginStatus$ = this._loginStatus.asObservable();

  getLoginStatus(): boolean {
    return this._loginStatus.getValue();
  }

  private _setLoginStatus(status: boolean): void {
    this._loginStatus.next(status);
  }

  setLoginStatus(status: boolean): void {
    this._setLoginStatus(status);
  }
  get userName(): string | null {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user).userName;
    } else {
      this.setLoginStatus(false)
      return null;
    }
  }
}
