import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.page.html',
  styleUrls: ['./filtro.page.scss'],
})
export class FiltroPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  cerrarModal(){
    //this.viewCtrl.dismiss();
  }

  GoToTodos(){
    //var Year =this.fecha.getFullYear();
    var filtro = {tipo:'Ninguna'}
    this.router.navigate(['/vendido',filtro])
    //this.navCtrl.push(VendidoPage,);
  }

  GoToFiltro(){

    var filtro = {tipo:'Fecha'}
    this.router.navigate(['/vendido',filtro]);
    //this.navCtrl.push(VendidoPage,{Mes:this.fecha.getMonth()+1,Year:this.fecha.getFullYear()});
  }

}
