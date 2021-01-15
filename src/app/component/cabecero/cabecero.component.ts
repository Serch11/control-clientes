import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { loginService } from 'src/app/services/loginService.service';
@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {
  faUser = faUser;
  faCog = faCog;
  faLogout = faSignOutAlt;
  public logginAuth: boolean = false;
  public userName: any;
  constructor(
    private loginService: loginService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    this.loginService.verifLogin().subscribe(auth => {
      if (auth) {
        this.logginAuth = true;
        this.userName = auth.email;
        //this.router.navigate(['/'])
      } else {
        this.logginAuth = false;
      }
    })


  }

  logout() {
    this.loginService.logoutSession()
    this.logginAuth = false;
    this.router.navigate(['/login'])
    window.location.reload();
  }

}
