import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = environment.TOKEN_KEY;
const USER_KEY = environment.USER_KEY;

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  isTokenAlive() {
    if (this.getToken()) {
      const decoded = jwtDecode<JwtPayload>(this.getToken() as string);
      const nowTimeStamp = new Date().getTime();
      const tokenExpireTime: number | undefined =
        (decoded.exp as number) * 1000;
      return tokenExpireTime < nowTimeStamp ? false : true;
    } else {
      return false;
    }
  }

  private saveForSession(token: string): void {
    this.clearTokenForSession();
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  private saveForLocal(token: string): void {
    this.clearTokenForLocal();
    localStorage.setItem(TOKEN_KEY, token);
  }

  private clearTokenForSession() {
    if (sessionStorage.getItem(TOKEN_KEY)) sessionStorage.removeItem(TOKEN_KEY);
  }

  private clearTokenForLocal() {
    if (localStorage.getItem(TOKEN_KEY)) localStorage.removeItem(TOKEN_KEY);
  }

  clearToken() {
    this.clearTokenForLocal();
    this.clearTokenForSession();
  }

  setToken(token: string) {
    this.saveForLocal(token);
    this.saveForSession(token);
  }

  getToken(): string | undefined {
    const fromSessionStorage = sessionStorage.getItem(TOKEN_KEY);
    if (fromSessionStorage) {
      return fromSessionStorage;
    } else if (localStorage.getItem(TOKEN_KEY)) {
      const fromLocalStorage = localStorage.getItem(TOKEN_KEY) as string;
      this.saveForSession(fromLocalStorage);
      return fromLocalStorage;
    }
    return undefined;
  }

  saveUser(user: any): void {
    this.clearUser();
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  clearUser() {
    if (sessionStorage.getItem(USER_KEY)) sessionStorage.removeItem(USER_KEY);
  }

  getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  login(res: any) {
    this.setToken(res.token);
    this.saveUser(res);
  }

  logout() {
    this.clearToken();
    this.clearUser();
  }
}
