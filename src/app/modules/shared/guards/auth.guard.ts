import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router:Router,
    private authService:AuthService
  ) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if(this.tokenService.isTokenAlive()){
      return this.tokenService.isTokenAlive()
    }else{
      this.authService.logout();
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userService.getLoginStatus();
  }
}
