import { Component, OnInit } from '@angular/core';
import { ModalController,AlertController,MenuController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario;
  y;
  usuarios:any = [];
  usu:any = [];
  email;
  id = Date.now();
  foto: any = '';

  constructor(public afDB:AngularFireDatabase,
              private ofauth:AngularFireAuth,
              private camera:Camera,
              public alec:AlertController,
              public modal:ModalController,
              public modalCtrl:ModalController,
              private router:Router,
              private menu:MenuController){

                this.ofauth.authState.subscribe(auth =>{
                  this.email=auth.email;
            
             this.afDB.database.ref('usuarios/'+auth.uid).on('value', user => {
                this.usuario = user.val();
                this.usuarios.splice(this.y,0,this.usuario)
             });     
                
              });
               }

  ngOnInit() {
  }

  async CambiarFoto(){

    const cam = await this.alec.create({
      header:'ATENCION',
      message:'¿Desa tomar una foto o Elegir de la galeria?',
      buttons:[{
        text:'Foto',
        handler: () => {
          this.perfil1();
        }},{
        text:'Galeria',
        handler: () => {
          this.Galeria();
        }
      },{
        text:'Cancelar'
      }]
    });
    
    await cam.present();
    }

    Galeria(){

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
         
          this.ofauth.authState.subscribe(auth =>{
    
            this.afDB.database.ref('usuarios/'+auth.uid).update({Perfil:this.foto});
            //this.navCtrl.setRoot(this.navCtrl.getActive().component);//actualiza los datos, recarga la pagina 
            //this.router.navigate(['/home']);
            location.reload();
          });
    
      }, (err) => {
          console.log(err);
      });
    
    }

    perfil1(){
  
      this.ofauth.authState.subscribe(auth =>{
        this.email = auth.email;
        
       this.camera.getPicture({
        quality : 95,
        destinationType : this.camera.DestinationType.DATA_URL,
        sourceType : this.camera.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: this.camera.EncodingType.PNG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true
      }).then(profilePicture => {
        this.foto = "data:image/jpeg;base64," + profilePicture;
  
        this.ofauth.authState.subscribe(auth =>{
  
          this.afDB.database.ref('usuarios/'+auth.uid).update({Perfil:this.foto});
          //this.navCtrl.setRoot(this.navCtrl.getActive().component);//actualiza los datos, recarga la pagina 
          alert("Se actulizo la foto de perfil!");
          location.reload(); //iba antes perfil
  
        });
  
      }, error => {
        // Log an error to the console if something goes wrong.
        console.log("ERROR -> " + JSON.stringify(error));
      });
      
    });
  
    }

    async Editar(){
     
      this.router.navigate(['/use'])

    }
    
    async GoToVentas(){
  
      this.router.navigate(['/filtro']);

    }

    OpenMenu() {
      this.menu.enable(true, 'menu');
      this.menu.open('menu');
    }

}
