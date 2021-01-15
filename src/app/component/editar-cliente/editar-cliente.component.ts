import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModel } from 'src/app/model/clientModel';
import { clienteService } from 'src/app/services/clienteService.service';
import { faUser, faBackward, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  faUser = faUser; faBackward = faBackward; faTrash = faTrashAlt; faSave = faSave;
  public cliente: ClienteModel = {
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    saldo: 0
  }
  public id: string;
  constructor(
    private clienteService: clienteService,
    private router: Router,
    private _route: ActivatedRoute,
    private flashMessgess: FlashMessagesService
  ) {
    this.id = _route.snapshot.params['id'];
    this.clienteService.getCliente(this.id).subscribe(res => {
      this.cliente = res;
      console.log(this.cliente)
    })

  }

  ngOnInit(): void {
    console.log(this.id)

  }

  guardar({ value, valid }: { value: ClienteModel, valid: boolean }) {
    if (!valid) {
      this.flashMessgess.show("por favor llene el formulario correctamente", {
        cssClass: 'alert-danger', timeout: 4000
      })
    } else {
      value.id = this.id;
      console.log(value)
      this.clienteService.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    if (confirm("esta seguro de eliminar el cliente ?")) {
      this.clienteService.eliminarcliente(this.cliente,this.id);
      this.router.navigate(['/']);
    }
  };

}
