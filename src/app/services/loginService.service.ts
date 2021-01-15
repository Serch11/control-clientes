import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class loginService {

  constructor(
    private router: Router,
    private authService: AngularFireAuth
  ) { }

  login(email: string, password: string) {
    return new Promise((resolve, rejects) => {
      this.authService.signInWithEmailAndPassword(email, password)
        .then((datos) => {
          resolve(datos)
        },
          error => {
            rejects(error)
          }
        )
    })
  }

  verifLogin() {
    return this.authService.authState.pipe(
      map(auth => auth)
    )
  }

  logoutSession() {
    return this.authService.signOut()
  }

  createUser(email: string, password: string) {
    return this.authService.createUserWithEmailAndPassword(email, password);
  }
}
