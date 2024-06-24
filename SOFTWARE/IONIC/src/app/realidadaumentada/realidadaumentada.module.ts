import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RealidadaumentadaPage } from './realidadaumentada.page';

const routes: Routes = [
  {
    path: '',
    component: RealidadaumentadaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RealidadaumentadaPage]
})
export class RealidadaumentadaPageModule {}
