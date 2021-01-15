import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableroComponent } from '../app/component/tablero/tablero.component';
import { ConfiguracionComponent } from './component/configuracion/configuracion.component';
import { EditarClienteComponent } from './component/editar-cliente/editar-cliente.component';
import { LoginComponent } from './component/login/login.component';
import { NoEncontradoComponent } from './component/no-encontrado/no-encontrado.component';
import { RegistroComponent } from './component/registro/registro.component';
import { authGuard } from './Guardian/gurdian.guard';


const routes: Routes = [
  { path: '', component: TableroComponent , canActivate:[authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegistroComponent },
  { path: 'configuracion', component: ConfiguracionComponent , canActivate:[authGuard]},
  { path: 'cliente/editar/:id', component: EditarClienteComponent , canActivate:[authGuard]},
  { path: '**', component: NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
