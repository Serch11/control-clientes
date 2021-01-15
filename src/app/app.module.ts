import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CabeceroComponent } from './component/cabecero/cabecero.component';
import { ClientesComponent } from './component/clientes/clientes.component';
import { EditarClienteComponent } from './component/editar-cliente/editar-cliente.component';
import { LoginComponent } from './component/login/login.component';
import { NoEncontradoComponent } from './component/no-encontrado/no-encontrado.component';
import { RegistroComponent } from './component/registro/registro.component';
import { PiePaginaComponent } from './component/pie-pagina/pie-pagina.component';
import { TableroComponent } from './component/tablero/tablero.component';
import { ConfiguracionComponent } from './component/configuracion/configuracion.component';
import { clienteService } from './services/clienteService.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { loginService } from './services/loginService.service';
import { authGuard } from './Guardian/gurdian.guard';




@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    ClientesComponent,
    EditarClienteComponent,
    LoginComponent,
    NoEncontradoComponent,
    RegistroComponent,
    PiePaginaComponent,
    TableroComponent,
    ConfiguracionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfi, 'control-clientes'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot()

  ],
  providers: [clienteService, loginService, authGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
