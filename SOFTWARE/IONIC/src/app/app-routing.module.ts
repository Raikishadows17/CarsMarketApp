import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'autoventa', loadChildren: './autoventa/autoventa.module#AutoventaPageModule' },
  { path: 'contacto', loadChildren: './contacto/contacto.module#ContactoPageModule' },
  { path: 'filtro', loadChildren: './filtro/filtro.module#FiltroPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'ncarro', loadChildren: './ncarro/ncarro.module#NcarroPageModule' },
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'recupcontra', loadChildren: './recupcontra/recupcontra.module#RecupcontraPageModule' },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'use', loadChildren: './use/use.module#UsePageModule' },
  { path: 'vendido', loadChildren: './vendido/vendido.module#VendidoPageModule' },
  { path: 'ancla', loadChildren: './ancla/ancla.module#AnclaPageModule' },
  { path: 'funcionra', loadChildren: './funcionra/funcionra.module#FuncionraPageModule' },
  { path: 'publicacion/:id', loadChildren: './publicacion/publicacion.module#PublicacionPageModule' },
  { path: 'realidadaumentada', loadChildren: './realidadaumentada/realidadaumentada.module#RealidadaumentadaPageModule' },
  { path: 'videora', loadChildren: './videora/videora.module#VideoraPageModule' },
  { path: 'maps/:latitud/:longitud', loadChildren: './maps/maps.module#MapsPageModule' },
  { path: 'editautos/:IdCarro', loadChildren: './editautos/editautos.module#EditautosPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
