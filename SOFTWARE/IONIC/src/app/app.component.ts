import { Component } from '@angular/core';

import { Platform,AlertController,MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../models/user';






@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    { title: 'Feed', url: '/home'},            
    { title: 'Mis Publicaciones', url: '/autoventa'},
    { title: 'Perfil de usuario', url: '/perfil'},
    { title: 'Contacto', url: '/contacto'}
  ];

  email:any = null;
  user = {} as User;
  usuario:any;
  perfil;
  usuarios = [];
  y;


  constructor(
    public platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:Router,
    private ofauth:AngularFireAuth,
    public afDB:AngularFireDatabase,
    private alertc:AlertController,
    private Menu:MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

console.log('muestra')

      this.ofauth.authState.subscribe(auth =>{
        this.email = auth.email;
        this.afDB.database.ref('usuarios/'+auth.uid).on('value', user => {
            this.usuario = user.val();
            console.log(user.val());
            //this.usuarios.splice(this.y,0,this.usuario)
            //console.log(this.usuarios)
         });
         this.router.navigate(['/home']);
    });

    if(this.ofauth.authState){
      this.router.navigate(['/login']);
    }

    });
  }

  async cerrarsession(){

    this.ofauth.authState.subscribe(auth =>{
      this.email=auth.email;

    this.Alert();      
  });
  //this.nav.setRoot(LoginPage)
  this.Menu.close();
    this.router.navigate(['/login'])
    }

async Alert(){
  const alert = await this.alertc.create({
    header:'Cerrando sesion',
    message:'el usuario ' +this.email +' ha cerrado sesion',
  buttons:[{
      text: 'Ok',
      handler: data => {
        this.ofauth.auth.signOut();
      }  
  }]
  });
 await alert.present();
}


}
