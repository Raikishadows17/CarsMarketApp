import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from 'angularfire2/storage';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
//import firebase from 'firebase';



@Component({
  selector: 'app-ncarro',
  templateUrl: './ncarro.page.html',
  styleUrls: ['./ncarro.page.scss'],
})
export class NcarroPage implements OnInit {

  Carro:any = [];
  foto: any = '';
  linkImagen: string;
  email:any;
  Tipo: any;
  EsCilin;//variable para esconder el cilindraje en caso que sea moto

  id = Date.now();

  constructor(public afDB:AngularFireDatabase,
    private ofauth:AngularFireAuth,
    public camera:Camera,
    public alec:AlertController,
    private router:Router,
    private Storange:AngularFireStorage,
    ){

     }

  Galeria(){
console.log('prueba');
  let cameraOptions : CameraOptions = {
      quality: 50,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.PNG,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
  }

  this.camera.getPicture(cameraOptions).then((imageData) => {
    // imageData is a base64 encoded string
      this.foto = "data:image/jpeg;base64," + imageData;
      
  }, (err) => {
      console.log(err);
  });
}

/*async obURL(id){

  const storageRef = firebase.storage().ref().child(`Imagenes/${this.email}/Productos/${id}.png`);
  // Create a timestamp as filename
storageRef.putString(this.foto, 'base64', {contentType: 'image/png'}).then(Durl => {
  this.linkImagen = Durl.downloadURL;
  
this.mus(Durl.downloadURL);
});

storageRef.getDownloadURL()
}*/

async mus(Durl){
  const mus = await this.alec.create({
    header:''+ Durl
  });
  await mus.present()
}

async agregar(){

  var expr = /^([0-9])+$/;
  var exprSololetra = /^[a-zA-Z\s]+$/;

  //console.log(expr.test(this.Carro.Precio),expr.test(this.Carro.Modelo),exprSololetra.test(this.Carro.Marca));

  this.id=this.id;

  console.log(this.Tipo);

  if(this.Tipo == 'Moto'){
    this.Carro.Cilindraje = 0;
    
  }
  console.log(this.Tipo,this.Carro.Cilindraje);
  
  //this.obURL(this.id);
if(expr.test(this.Carro.Precio) == true && expr.test(this.Carro.Modelo) == true && exprSololetra.test(this.Carro.Marca) == true && expr.test(this.Carro.Kilometraje) == true && exprSololetra.test(this.Carro.Clima) == true){ 

if(this.foto == ''){

  const fot = await this.alec.create({
    header:'ATENCION',
    message:'Selecciona una foto',
    buttons:['OK']
  });
  
  await fot.present();
  
  }else{
  
  if(this.Carro.Marca == null || this.Carro.Modelo == null || this.Carro.Transmicion == null || this.Carro.Cilindraje == null || this.Carro.AdeuAnu == null || this.Carro.Precio == null || this.Carro.Descripcion == null || this.Tipo ==null || this.Carro.Kilometraje == null || this.Carro.Clima == null){
  
    const cap = await this.alec.create({
      header:'ATENCION',
      message:'Todos los campos deben estar llenos',
      buttons:['OK']
    });
    
    await cap.present();
  
  }else{
  
    if(this.Carro.Cilindraje.length > 1){
      
      const LMod = await this.alec.create({
        header:'ATENCION',
        message:'Numero maximo de digitos permitidos en el campo "Modelo": 4 ',
        buttons:['OK']
      });
  
      const Lcil = await this.alec.create({
        header:'ATENCION',
        message:'Numero maximo de digitos permitidos en el campo "Cilindros": 1',
        buttons:['OK']
      });
  
      const LAde = await this.alec.create({
        header:'ATENCION',
        message:'Numero maximo de digitos permitidos en el campo "Adeudo Anual": 2 ',
        buttons:['OK']
      });
  
      if(this.Carro.Cilindraje.length > 1){
        Lcil.present();    
      }
  
    }else{
      this.uploadImg()
    /*this.ofauth.authState.subscribe(auth =>{
      this.email=auth.email;
  
  this.afDB.database.ref('Carros/'+this.id).set({
    IdCarro:this.id,
    Marca:this.Carro.Marca,
    Modelo:this.Carro.Modelo,
    Transmicion:this.Carro.Transmicion,
    AdeuAnu:this.Carro.AdeuAnu,
    Cilindraje:this.Carro.Cilindraje,
    Precio: parseInt(this.Carro.Precio),
    Descripcion:this.Carro.Descripcion,
    Vendedor:auth.uid,
    Foto:this.foto,
    Estado:'Disponible',
    RA:'false',
    Tipo:this.Tipo
  });
     
  });*/ 
  
  //this.navCtrl.setRoot(AutoventaPage);
  this.router.navigate(['/autoventa'])
  }
  }
  
  }
    

}else{

const precio = await this.alec.create({
  header:'ATENCION',
  message:'En el campo de precio solo se permite digitos o esta vacio',
  buttons:['OK']
});
const kilometraje = await this.alec.create({
  header: 'ATENCION',
  message: 'En el campo de Kilometraje solo se permite digitos o esta vacio',
  buttons: ['OK']
});

const Marca = await this.alec.create({
  header:'ATENCION',
  message:'En el campo de marca solo se permiten letras o esta vacio',
  buttons:['OK']
});

const Modelo = await this.alec.create({
  header:'ATENCION',
  message:'En el campo de modelo solo se permite digitos o esta vacio',
  buttons:['OK']
});

const clima = await this.alec.create({
  header:'ATENCION',
  message:'En el campo de modelo solo se permite letras o esta vacio',
  buttons:['OK']
})

const AdeuAnu = await this.alec.create({
  header:'ATENCION',
  message:'En el campo de Años de adeudo solo se permite digitos o esta vacio',
  buttons:['OK']
});

if(expr.test(this.Carro.Precio) == false){
  await precio.present();
} 
if(expr.test(this.Carro.Kilometraje) == false){
  await kilometraje.present();
}

if(expr.test(this.Carro.Modelo) == false){
  await Modelo.present();
} 

 if(exprSololetra.test(this.Carro.Marca) == false){
  await Marca.present();
 }

 if(exprSololetra.test(this.Carro.Clima) == false){
  await clima.present();
 }

 /*if(expr.test(this.Carro.AdeuAnu) == false){
  await AdeuAnu.present()
 }*/

}}

uploadImg(){
  this.ofauth.authState.subscribe(auth =>{
    this.Storange.ref('Carros/'+auth.uid+'/'+this.id).putString(this.foto,'data_url').then(data =>{
      this.getPhoto();
    });
  })
}

getPhoto(){
  //this.Storange.ref.child('images/stars.jpg').getDownloadURL().then(function(url) {});
  //this.Storange.refFromUrl('gs://cars-market.appspot.com/Prueba');
  this.ofauth.authState.subscribe(auth =>{
  this.Storange.storage.refFromURL('gs://cars-market.appspot.com/Carros/'+auth.uid+'/'+this.id).getDownloadURL().then(data =>{
    console.log(data)
    
      this.email=auth.email;
  
  this.afDB.database.ref('Carros/'+this.id).set({
    IdCarro:this.id,
    Marca:this.Carro.Marca,
    Modelo:this.Carro.Modelo,
    Transmicion:this.Carro.Transmicion,
    AdeuAnu:this.Carro.AdeuAnu,
    Cilindraje:this.Carro.Cilindraje,
    Precio: parseInt(this.Carro.Precio),
    Kilometraje: parseInt(this.Carro.Kilometraje),
    Clima: this.Carro.Clima,
    Descripcion:this.Carro.Descripcion,
    Vendedor:auth.uid,
    Foto:data,
    Estado:'Disponible',
    RA:'false',
    Coordenadas: 'false',
    Tipo:this.Tipo,
    Calif:0
  });
     alert("Se a registrado el vehiculo con exito");
  });
    //this.foto = data;
  });
}



Cancelar(){
  //this.navCtrl.setRoot(AutoventaPage);
  this.router.navigate(['/autoventa']);
}

  ngOnInit() {
  }

}
