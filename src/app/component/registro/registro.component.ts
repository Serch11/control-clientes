import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FlashMessagesService } from 'angular2-flash-messages';
import { loginService } from 'src/app/services/loginService.service';
import Swal from 'sweetalert/';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  faUser = faUser; faUserplus = faUserPlus;
  public emailRegistro: string = "";
  public passwordRegistro: string = "";
  constructor(

    private router: Router,
    private flassMessage: FlashMessagesService,
    private loginService: loginService

  ) { }

  ngOnInit(): void {
  }


  crearUser({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) {
      this.flassMessage.show("ingrese datos validos porfavor", {
        cssClass: "alert-danger", timeout: 4000
      })
    } else {
      this.loginService.createUser(this.emailRegistro, this.passwordRegistro).then((response: any) => {
        console.log(response)
        if (response) {
          console.log(response);
          console.log("llego el mensaje")
          Swal("Usuario Creado", "Ya puede iniciar session con el usuario creado", "success")
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        }
      }).catch((error) => {
        this.flassMessage.show(`${error}`, {
          cssClass: "alert-danger", timeout: 4000
        })
      })
    }
  }
}
