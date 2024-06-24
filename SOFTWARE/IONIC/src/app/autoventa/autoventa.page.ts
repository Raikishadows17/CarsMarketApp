import { Component, OnInit } from '@angular/core';
import { AlertController,MenuController,NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx'

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from '../../../node_modules/firebase';
import { File, FileEntry } from '@ionic-native/file/ngx';
import{ InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';


import {
  MediaCapture,
  MediaFile,
  CaptureError,
  CaptureVideoOptions
} from '@ionic-native/media-capture/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';


declare var google:any;


@Component({
  selector: 'app-autoventa',
  templateUrl: './autoventa.page.html',
  styleUrls: ['./autoventa.page.scss'],
})
export class AutoventaPage implements OnInit {

  Carros = [];
  Carro;

  coords : any = { lat:0,lng: 0}
  address: string;

  Tvendido = 0;
  
  Tipo;
  
  y = 0;
  x = 0;
  
  fecha = new Date();

  options: InAppBrowserOptions = {
    location: 'yes', //Or 'no'
    hidden: 'no', //or yes
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'no',
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only   
  };


  constructor(public ofDB:AngularFireDatabase,
              private ofauth:AngularFireAuth, 
              public alerc:AlertController,
              private router:Router,
              private menu:MenuController,
              private navCtrl:NavController,
              private geolocation:Geolocation,
              public platform:Platform,
              private mediaCapture: MediaCapture,  
              private file: File, 
              private theInAppBrowser: InAppBrowser,
              private media: Media,


              ){ 
                this.Tipo = 'Auto'                    
                platform.ready().then(() => {
                  // La plataforma esta lista y ya tenemos acceso a los plugins.
                    this.obtenerPosicion();
                 });
              }

  ngOnInit() {
    this.ofauth.authState.subscribe( auth => {

      this.ofDB.database.ref("Carros").orderByChild("Vendedor").equalTo(auth.uid).on("child_added", (snapshot)=>{
          if(snapshot.val().Estado == 'Disponible'){
            this.Carro = snapshot.val();
            this.Carros.splice(this.y,0,this.Carro);
          }        
      });    
    })  
  }

  async alertConfirmUbicacion(IdCarro){

    let ubicacion = await this.alerc.create({
        header:'ATENCION',
        message:'¿Estas seguro que deseas mostrar tu ubicación?',
        buttons: [
          {
            text: 'SI',
            handler: () => {
              this.guardarUbicacion(IdCarro);
            }
          },
          {
            text: 'NO',
            handler: () => {}
          }
        ]
    });

     ubicacion.present() 
  }

  obtenerPosicion():any{
    this.geolocation.getCurrentPosition().then(res => {
      this.coords.lat = res.coords.latitude;
      this.coords.lng = res.coords.longitude;     
    })
    .catch(
      (error)=>{
        console.log(error);
      }
    );
    console.log(this.coords)    

  }

  guardarUbicacion(IdCarro){
    console.log(this.coords);
    this.getAddress(this.coords).then(results =>{
      this.address = results[0]['formatted_address'];
    },errStatus => {
        alert(errStatus);
    });
    console.log(this.address)
    this.ofDB.database.ref('Carros/'+IdCarro).update({
      address:this.address,
      latitud: this.coords.lat,
      longitud: this.coords.lng,
      Coordenadas: 'true'});   

    }

  getAddress(coords):any {
    var geocoder = new google.maps.Geocoder();

    return new Promise(function(resolve, reject) {
        geocoder.geocode({'location': coords} , function (results, status) { // llamado asincronamente
            if (status == google.maps.GeocoderStatus.OK) {
                resolve(results);
            } else {
                reject(status);
            }
        });
    });
}
  

  NewCar(){
    //this.navCtrl.push(NcarroPage);
    this.router.navigate(['/ncarro']);
  }

  async IMRA(IdCarro,RA){

    const RAexist = await this.alerc.create({
      header:'ATENCION',
      message:'Esta publicación ya tiene en proceso de aplicar la realidad aumentada',
      buttons:[{
        text:'OK',
        handler: () => {
          //this.Imra(IdCarro);
        } 
      }]
    })

    const RATrue = await this.alerc.create({
      header:'ATENCION',
      message:'Esta publicación ya cuenta con realidad aumentada',
      buttons:[{
        text:'OK',
        handler: () => {
          //this.Imra(IdCarro);
        } 
      }]
    })

    const conRA = await this.alerc.create({
      header:'ATENCION',
      message:'¿Desea utilizar la realidad aumentada?',
      buttons:[{
        text:'SI',
        handler: () => {
          this.Imra(IdCarro);
        } 
      },{
       text:'No'
      }]
    })


    if(RA == 'Proceso'){     
      await RAexist.present();        
    }else{
      if(RA == 'true'){
        await RATrue.present();
      }else{
        await conRA.present();  
      }
      
    }

  }

  async Imra(IdCarro){
    const imra = await this.alerc.create({
      header:'ATENCION',
      message:'Su solicitud esta en proceso',
      buttons:[{
        text:'OK',
        handler: () => {
          //this.ofDB.database.ref('Carros/'+IdCarro).update({RA:'true'});
          this.ofDB.database.ref('Carros/'+IdCarro).update({RA:'Proceso'});      
          //this.navCtrl.setRoot(this.navCtrl.getActive().component);//actualiza los datos, recarga la pagina
          //this.router.navigate(['/autoventa']);
          location.reload();
          var item = {tipo:'autoventa'}
          //this.router.navigate(['/ancla',item]);
        } 
      }
    ]
    });
    await imra.present();
  }

  async Eliminar(IdCarro,RA){

    console.log(IdCarro,RA)
  
    const elim = await this.alerc.create({
      header:'ATENCION',
      message:'¿Esta seguro que deseas eliminar el vehiculo?',
      buttons:[{
        text:'SI',
        handler: () => {
          this.ofDB.database.ref('Carros/'+IdCarro).remove();
          //this.navCtrl.setRoot(this.navCtrl.getActive().component);//actualiza los datos, recarga la pagina
          //this.router.navigate(['/autoventa']);
         
        }
      },{
        text:'NO',
        handler: () => {
          
        }
      }
    ]
    })

    const procRA = await this.alerc.create({
      header:'ATENCION',
      message:' Hay una solicitud de RA para esta publicación ¿Estas seguro que quiere eliminar esta publicación?',
      buttons:[{
        text:'SI',
        handler: () => {
          this.ofDB.database.ref('Carros/'+IdCarro).remove();
          //this.navCtrl.setRoot(this.navCtrl.getActive().component);//actualiza los datos, recarga la pagina
          this.router.navigate(['/autoventa']);
          location.reload();
        }
      },{
        text:'NO',
        handler: () => {
          
        }
      }
    ]
    })

    if(RA == 'Proceso'){
      await procRA.present();
    }else{
      await elim.present();  
    }
  }
async SubioVideo(IdCarro){
  
  let subida = await this.alerc.create({
    header:'ATENCION',
    message:'¿Ya Subio el Video a la carpeta en Drive?',
    buttons: [
      {
        text: 'SI',
        handler: () => {
          this.guardarEstadoRA(IdCarro);
        }
      },
      {
        text: 'NO',
        handler: () => {}
      }
    ]
});

 subida.present() 
}
guardarEstadoRA(IdCarro){
  this.ofDB.database.ref('Carros/'+IdCarro).update({RA:'EnTramite'});      
          //this.navCtrl.setRoot(this.navCtrl.getActive().component);//actualiza los datos, recarga la pagina
          //this.router.navigate(['/autoventa']);
          location.reload();

}
  async Vendido(IdCarro){

    const con = await this.alerc.create({
      header:'ATENCION',
      message:'¿Desea marcar su publicación como vendida?',
      buttons:[{
        text:'Si',
        handler: () => {
          this.ofDB.database.ref('Carros/'+IdCarro).update({Estado:'Vendido',Mes:this.fecha.getMonth()+1,year:this.fecha.getFullYear()});       
          this.ofauth.authState.subscribe(auth =>{
            this.x = this.x + 1;
            this.ofDB.database.ref("usuarios/"+auth.uid).on("value", (snapshot)=>{
              console.log(snapshot.val().TVentas);
              var TVentas = snapshot.val().TVentas;
              console.log(TVentas);
              this.ofDB.database.ref("Carros/"+IdCarro).on("value", (snapshot)=>{
                TVentas = TVentas + snapshot.val().Precio;
              });
              console.log(TVentas);
              //this.ofDB.database.ref('usuarios/'+auth.uid).update({TVentas:TVentas});
              console.log(this.x)
              if(this.x == 1){
                this.x = 3;
                this.UpdateVenta(TVentas,auth.uid);
              }
              

            });
            
          });  
          
                
        }
      },{
        text:'NO',
        handler: () => {
          
        }
      }
    ]
    })

    await con.present();
    
  }
  

  UpdateVenta(TVentas,uid){

    this.ofDB.database.ref('usuarios/'+uid).update({TVentas:TVentas});
    location.reload();
  }

  OpenMenu() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }
  gotoUpdateVideo(){
    this.router.navigate(['/videora']);
  }
  help_ra(){
    this.router.navigate(["/funcionra"]);
  }
  takeVideo(IdCarro){
    this.mediaCapture.captureVideo().then(
      (data: MediaFile[]) => {
       
        if (data.length > 0) {
          alert("Su video se guardo en la Galeria!");
          this.Videoproc(IdCarro);
          
          
        }
      },
      (err: CaptureError) => alert(err)
    );
  }

  async Videoproc(IdCarro){
    const procesora = await this.alerc.create({
      header:'ATENCION',
      message:'Su solicitud esta en proceso',
      buttons:[{
        text:'OK',
        handler: () => {
          //this.ofDB.database.ref('Carros/'+IdCarro).update({RA:'true'});
          this.ofDB.database.ref('Carros/'+IdCarro).update({RA:'Procesando'});      
          //this.navCtrl.setRoot(this.navCtrl.getActive().component);//actualiza los datos, recarga la pagina
          //this.router.navigate(['/autoventa']);
          location.reload();
          var item = {tipo:'autoventa'}
          //this.router.navigate(['/ancla',item]);
        } 
      }
    ]
    });
    await procesora.present();
  }

  openWithSystemBroser(url: string){
    let target = "_system";
    this.theInAppBrowser.create(url, target,this.options);
   }
   openWithSystemBroserMoto(url: string){
    let target = "_system";
    this.theInAppBrowser.create(url, target,this.options);
   }
   
}
