import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-vendido',
  templateUrl: './vendido.page.html',
  styleUrls: ['./vendido.page.scss'],
})
export class VendidoPage implements OnInit {

  auto;
  x;
  autosV=[];

  Tvendido = 0;
  TvendidoMesAuto = 0;
  TvendidoMesMoto = 0;
  TvendidoAcAuto = 0; //Total de ventas activas
  TvendidoAcMoto = 0; //Total de ventas activas

  Mes;
  Year;

  Tipo:any = 'Auto';
  filtro;

  fecha = new Date();

  constructor(public afDB:AngularFireDatabase,
              private ofauth:AngularFireAuth,
              private param:ActivatedRoute) { 

    /*this.Mes = this.navParams.get('Mes');
    this.Year = this.navParams.get('Year');*/

    this.ofauth.authState.subscribe(auth =>{
      this.afDB.database.ref("usuarios/"+auth.uid).on("value", (snapshot)=>{
        console.log(snapshot.val());
        this.Tvendido = snapshot.val().TVentas;
      });
    });

      this.param.params.subscribe(data =>{
        console.log(data);
        this.filtro = data.tipo;
        if(data.tipo == 'Ninguna'){
          this.Todos();
        }
        if(data.tipo == 'Fecha'){
          this.Filtro();
        }

      }); 
  }

  ngOnInit() {
  }


Todos(){
  this.ofauth.authState.subscribe(auth =>{
        this.afDB.database.ref("Carros").orderByChild("Vendedor").equalTo(auth.uid).on("child_added", (snapshot)=>{
          if(snapshot.val().Estado == 'Vendido'){
            this.auto = snapshot.val();
            this.autosV.splice(this.x,0,this.auto);

          console.log(snapshot.val().Tipo);

            if(snapshot.val().Tipo == 'Auto'){
              this.TvendidoAcAuto = this.TvendidoAcAuto + snapshot.val().Precio;
              console.log('Auto',1)
              console.log(snapshot.val().Precio)
            }
            if(snapshot.val().Tipo == 'Moto'){
              this.TvendidoAcMoto = this.TvendidoAcMoto + snapshot.val().Precio;  
              console.log('Moto',1)
              console.log(snapshot.val().Precio)
            }                      
          }
        });
  });      
}

  Filtro(){

    this.autosV = [];
    this.TvendidoMesAuto = 0;
    this.TvendidoMesMoto = 0;
    this.ofauth.authState.subscribe(auth =>{

        this.afDB.database.ref("Carros").orderByChild("Vendedor").equalTo(auth.uid).on("child_added", (snapshot)=>{
          if(this.Mes==snapshot.val().Mes && this.Year==snapshot.val().year){
            if(snapshot.val().Estado == 'Vendido'){
            this.auto = snapshot.val();
            this.autosV.splice(this.x,0,this.auto);
           if(snapshot.val().Tipo == 'Auto'){
            this.TvendidoMesAuto = this.TvendidoMesAuto + snapshot.val().Precio;
           }   
           if(snapshot.val().Tipo == 'Moto'){
            this.TvendidoMesMoto = this.TvendidoMesMoto + snapshot.val().Precio;
          }   
            
            }
          }
          console.log(this.autosV)
        
  });
  
  });  

  }

}
