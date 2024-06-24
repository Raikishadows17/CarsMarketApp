import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Button } from 'protractor';




@Component({
  selector: 'app-use',
  templateUrl: './use.page.html',
  styleUrls: ['./use.page.scss'],
})
export class UsePage implements OnInit {

  usuario;
  y;
  usuarios:any = [];
  email;

  constructor(public afDB:AngularFireDatabase,
              private ofauth:AngularFireAuth,
              private router:Router,
              private alert:AlertController
              ){ 

                this.ofauth.authState.subscribe(auth =>{
                  this.email=auth.email;
            
             this.afDB.database.ref('usuarios/'+auth.uid).on('value', user => {
                this.usuario = user.val();
             });     
                
              });

              }

  ngOnInit() {
  }

  async Actualizar(Nombre,Apellidos,Telefono){

    var nTelefono = Telefono.toString();
    console.log(nTelefono.length)

    var expr = /^([0-9])+$/;
    var exprSololetra = /^[a-zA-Z\s]+$/;

    if(exprSololetra.test(Nombre) == true && exprSololetra.test(Apellidos) == true && expr.test(Telefono) == true && nTelefono.length == 10 ){
    this.ofauth.authState.subscribe(auth =>{
      this.afDB.database.ref('usuarios/'+auth.uid).update({Nombre:Nombre,Apellidos:Apellidos,Telefono:Telefono});
     //this.router.navigate(['/perfil']);
     var item = {tipo:'autoventa'}
        //this.router.navigate(['/ancla',item]);
        location.reload();
    });
  }else{

  const nombre = await this.alert.create({
    header:'ATENCION',
    message:'El cambo "Nombre" solo permite Letras',
    buttons:['ok']
  });

  const tpellido = await this.alert.create({
    header:'ATENCION',
    message:'El cambo "Apellido" solo permite Letras',
    buttons:['ok']
  });

  const telefono = await this.alert.create({
    header:'ATENCION',
    message:'El cambo "Telefono" solo permite Numero',
    buttons:['ok']
  });

  const digtele = await this.alert.create({
    header:'ATENCION',
    message:'El cambo "Telefono" deben ser 10 numeros',
    buttons:['ok']
  });


  if(exprSololetra.test(Nombre) == false){
    await nombre.present();
  }
  if(exprSololetra.test(Apellidos) == false){
    await tpellido.present();
  }
  if(expr.test(Telefono) == false){
    await telefono.present();
  }
  if(nTelefono.length != 10){
    await digtele.present();
  }


  }

}
  Cancelar(){
    this.router.navigate(['/perfil']);
  }


}
