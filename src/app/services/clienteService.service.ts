import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs-compat";
import { map } from 'rxjs/operators'
import { ClienteModel } from '../model/clientModel';
@Injectable()

export class clienteService {
  clientesColeccion: AngularFirestoreCollection<ClienteModel>;
  clienteDoc: AngularFirestoreDocument<ClienteModel>;
  clientes: Observable<ClienteModel[]>;
  cliente: Observable<ClienteModel>;

  constructor(
    private db: AngularFirestore
  ) {
    this.clientesColeccion = db.collection('clientes', ref => ref.orderBy('nombre', 'asc'))
  }

  getClientes(): Observable<ClienteModel[]> {
    //obtenemos los clientes
    //console.log(this.clientesColeccion)
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map(cambios => {
        //console.log(cambios)
        return cambios.map(accion => {
          //console.log(accion)
          const datos = accion.payload.doc.data() as ClienteModel;
          //console.log(datos)
          datos.id = accion.payload.doc.id;
          return datos;
        })
      })
    )
    return this.clientes;
  }

  insertCliente(data: ClienteModel) {
    //console.log(data)
    console.log(data);
    this.clientesColeccion.add({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      saldo: data.saldo
    }).then((res) => {
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }

  getCliente(id: string) {
    this.clienteDoc = this.db.doc<ClienteModel>(`clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map(accion => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as ClienteModel;
          console.log(datos);
          return datos;
        }
      })
    )
    return this.cliente;
  }

  modificarCliente(cliente: ClienteModel) {
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  eliminarcliente(cliente: ClienteModel, id: string
  ) {
    this.clienteDoc = this.db.doc<ClienteModel>(`clientes/${id}`);
    this.clienteDoc.delete();
  }
}
