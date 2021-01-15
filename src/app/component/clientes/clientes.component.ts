import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteModel } from 'src/app/model/clientModel';
import { clienteService } from 'src/app/services/clienteService.service';
import { faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {



  faAd = faUserPlus;
  faUsers = faUsers
  public listClientes: Array<ClienteModel> = [];
  public cliente: ClienteModel = {
    nombre: "",
    apellido: "",
    email: "",
    saldo: 0
  }

  @ViewChild("clienteform") "clienteform": NgForm;
  @ViewChild('botonCerrar') "botonCerrar": ElementRef;

  constructor(
    private clienteService: clienteService,
    private flashMessage: FlashMessagesService
  ) {

  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      response => {
        //console.log(response)
        this.listClientes = response;
      },
      error => {
        console.log(error);
      }
    );
  }


  getSaldo() {
    var saldo: any = 0;
    this.listClientes.forEach((el) => {
      saldo += el.saldo;
      //console.log(saldo)
    })
    return saldo;
  }

  agregar({ value, valid }: { value: ClienteModel, valid: boolean }, form: FormData) {

    if (!valid) {
      this.flashMessage.show("Por favor llene el formulario correctamente", {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      console.log(value)
      this.clienteService.insertCliente(value);
      this.clienteform.resetForm();
      this.cerrarModal();
    }
  }

  cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }
}
