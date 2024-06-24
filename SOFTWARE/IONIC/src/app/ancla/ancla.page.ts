import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-ancla',
  templateUrl: './ancla.page.html',
  styleUrls: ['./ancla.page.scss'],
})
export class AnclaPage implements OnInit {

  foto: any = '';
  foto2: any = '';

  constructor(private router:Router, 
              private params:ActivatedRoute,
              public camera:Camera,
              private Storange:AngularFireStorage,
              private afDB:AngularFireDatabase,) { 

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

    upload(){
      this.Storange.ref('Prueba').putString(this.foto,'data_url').then(data =>{
        this.getPhoto();
      });

    }
    getPhoto(){
      //this.Storange.ref.child('images/stars.jpg').getDownloadURL().then(function(url) {});
      //this.Storange.refFromUrl('gs://cars-market.appspot.com/Prueba');
      this.Storange.storage.refFromURL('gs://cars-market.appspot.com/Prueba').getDownloadURL().then(data =>{
        console.log(data)
        this.afDB.database.ref('Productos').set({
          imagen:data
         });
        this.foto2 = data;
      });
    }

    getPhoto2(){
      //this.Storange.ref.child('images/stars.jpg').getDownloadURL().then(function(url) {});
      //this.Storange.refFromUrl('gs://cars-market.appspot.com/Prueba');
     
        this.afDB.database.ref('Productos').set({
          imagen:'si jalo'
         });
         
    }

  ngOnInit() {
  }

}
