import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase  } from 'angularfire2/database';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'app-editautos',
  templateUrl: './editautos.page.html',
  styleUrls: ['./editautos.page.scss'],
})
export class EditautosPage implements OnInit {

  esIDCarro: any;
  Carros = [];
  Carro;
  y = 0;
  x = 0;
  constructor(
    private afDB:AngularFireDatabase,
    private activateRoute: ActivatedRoute,
    private alert:AlertController,
    private ofauth:AngularFireAuth,
    private router:Router
    


  ) { }

  ngOnInit() {
    this.esIDCarro = this.activateRoute.snapshot.paramMap.get("IdCarro");
    console.log(this.esIDCarro);
    let idp : string = this.esIDCarro;
    if(this.esIDCarro){
     
      this.afDB.database.ref('Carros/'+idp).on('value', auto => {
        this.Carro = auto.val();
        console.log(auto.val());
    
        //this.Carros.push(auto.val());
        
        
     });
  }

}
async Actualizar(Marca, Modelo, Precio, Kilometraje, Descripcion){

  var expr = /^([0-9])+$/;
  var exprSololetra = /^[a-zA-Z\s]+$/;
  
  const actualizacionconfirmed = await this.alert.create({
    header: 'ATENCION',
    message: 'Los datos del automovil se han actualizado!',
    buttons: ['ok']
  });
  if(exprSololetra.test(Marca) == true && expr.test(Modelo) == true && expr.test(Precio) == true && expr.test(Kilometraje) == true ){
  this.ofauth.authState.subscribe(async auth =>{
    this.afDB.database.ref('Carros/'+this.esIDCarro).update({Marca:Marca,Modelo:Modelo,Precio:Precio,Kilometraje:Kilometraje, Descripcion: Descripcion});
   //this.router.navigate(['/perfil']);
   var item = {tipo:'autoventa'}
   await actualizacionconfirmed.present();

      //this.router.navigate(['/ancla',item]);
      location.reload();
  });
}else{

const cmarca = await this.alert.create({
  header:'ATENCION',
  message:'El campo "Marca" solo permite Letas!',
  buttons:['ok']
});

const cmodelo = await this.alert.create({
  header:'ATENCION',
  message:'El campo "Modelo" solo permite Numeros!',
  buttons:['ok']
});

const cprecio = await this.alert.create({
  header:'ATENCION',
  message:'El campo "Precio" solo permite Numero!',
  buttons:['ok']
});
const ckilometraje = await this.alert.create({
  header:'ATENCION',
  message:'El campo "Kilometraje" solo permite Numero!',
  buttons:['ok']
});
const cdescripcion = await this.alert.create({
  header:'ATENCION',
  message:'El campo "Descripcion" solo permite Letras y numeros!',
  buttons:['ok']
});





if(exprSololetra.test(Marca) == false){
  await cmarca.present();
}
if(expr.test(Modelo) == false){
  await cmodelo.present();
}
if(expr.test(Precio) == false){
  await cprecio.present();
}
if(expr.test(Kilometraje) == false){
  await ckilometraje.present();
}



}

}
Cancelar(){
  this.router.navigate(['/autoventa']);
}


}
