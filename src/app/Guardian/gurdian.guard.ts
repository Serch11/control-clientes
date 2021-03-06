import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(
    private authService: AngularFireAuth,
    private router: Router
  ) {

  }

  canActivate(): Observable<boolean> {
    return this.authService.authState.pipe(
      map(auth => {
        if (!auth) {
          this.router.navigate(['/login'])
          return false;
        } else {
          return true;
        }
      })
    )
  }
}
