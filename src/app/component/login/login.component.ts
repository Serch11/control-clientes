import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FlashMessagesService } from 'angular2-flash-messages';
import { loginService } from 'src/app/services/loginService.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public emaill: string = "";
  public passwordd: string = "";
  public logginAuth: boolean = false;
  public userName: any;
  faUser = faUser;
  constructor(
    private router: Router,
    private flashmessage: FlashMessagesService,
    private loginService: loginService
  ) { }

  ngOnInit(): void {

      this.loginService.verifLogin().subscribe(
        auth =>{
          if(auth){
            //this.router.navigate(['/']);
          }
        }
      )
  }


  Loggin() {
    this.loginService.login(this.emaill, this.passwordd).then((value) => {
      this.router.navigate(['/'])
    }).catch((value) => {
      this.flashmessage.show(`el email o contraseña son erroenas ${value}`, {
        cssClass: "alert-danger", timeout: 4000
      })
    })
  }

}
