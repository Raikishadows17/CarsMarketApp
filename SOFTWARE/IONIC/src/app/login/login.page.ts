import { Component, OnInit } from '@angular/core';
import { AlertController,ToastController, Platform } from '@ionic/angular';

import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase/app';
import { ResultGoogle } from '../../models/resultGoogle';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:any ={} as User;
  usuario;
  email;

  picture;
  name;


  constructor(public afDB:AngularFireDatabase,
              private ofauth:AngularFireAuth,
              public alertCtrl:AlertController,
              public toastCtrl:ToastController,
              private router:Router,
              private google: GooglePlus,
              private platform: Platform
              ){


               }             

ngOnInit() {
}

async login(user:User){

  const toast = await this.toastCtrl.create({
    message: 'Ingreso correcto',
    duration: 3000,
    position: 'bottom'
      });

  const result = this.ofauth.auth.signInWithEmailAndPassword(user.email,user.password)

  result.then(res =>{
    console.log(res.user);

    //this.afDB.database.ref('usuarios/'+res.user.uid).on("value", (snapshot)=>{
      this.afDB.database.ref('usuarios/'+res.user.uid).on("value", (snapshot)=>{
      console.log(snapshot.val());

      if(snapshot.val().Tipo == "Usuario"){  
        
        this.router.navigate(['/home']);
     }else{
      this.noExistAlert();
          }

    });

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.name;
    var errorMessage = error.message;
  
    if (error.message=='The password is invalid or the user does not have a password.'){
        alert('Contraseña incorrecta')  
    }
    if (error.message=='There is no user record corresponding to this identifier. The user may have been deleted.'){
        alert('El usuario no existe')
    }
    if (error.message=='The user account has been disabled by an administrator.'){
        alert('La cuenta de usuario ha sido deshabilitada')
    }
    if (error.message=='The email address is badly formatted.'){
        alert('El email no esta escrito correctamente')  
    }
    if (error.message=='A network error (such as timeout, interrupted connection or unreachable host) has occurred.'){
      alert('Tiempo de respuesta agotado, verifica tu conexion de internet')
  }
    console.log(error);
  });

}

async ErrorAlert(){
  const errove = await this.alertCtrl.create({
    header:'ATENCION',
    message:'El email con el que estas intentando acceder no esta activado, porfavor verifica tu correo electronico para activar la cuenta',
    buttons:[{
      text:'OK',
      handler: () =>{
        this.ofauth.auth.signOut();
      }
    }] 
  });
  await errove.present()
}

async noExistAlert(){
  const noexis = await this.alertCtrl.create({
    header:'ATENCION',
    message:'Este usuario no tiene permiso para acceder a esta aplicacion',
    buttons:[{
      text:'OK',
      handler: () =>{
        this.ofauth.auth.signOut();
      }
    }] 
  });
  await noexis.present();
}

registrar(){
  this.router.navigate(['/registro']);
}

recupcontra(){
  this.router.navigate(['/recupcontra']);
}

accionAdmin(){
  this.router.navigate(["/adminlogin"]);
}

async loginGoogleAndroid(){
  const res = await this.google.login({
    'webClientId': '513406278574-jto8eaarf83vet4bkliflr7ntd2sn6qd.apps.googleusercontent.com',
    'offline': true
  });
  

  
  // Iniciar sesión con la credencial de Google
  const resConfirmed = await this.ofauth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(res.idToken)
      );
   const user  = resConfirmed;  
   const nameArr = user.displayName.split(' ');
   const firstName = nameArr[0];
   const lastName = nameArr.splice(1).join(' ');
      // Verificar si el usuario ya existe en la base de datos
      const userRef = this.afDB.database.ref("usuarios/${user.uid}");
      const userSnapshot = await userRef.once('value');
      const userData = userSnapshot.val();
  
      if(!userData){
        // Si el usuario no existe, se crea en la base de datos
        await userRef.set({
          Nombre: firstName,
          Apellidos: lastName,
          email: user.email,
          photoURL: user.photoURL,
          TVentas: 0,
          Telefono: "",
          Tipo: "Usuario",
        });
        // Redirigir al usuario a la página de inicio
        this.router.navigate(['/home']);
      }else{
          // Redirigir al usuario a la página de inicio
          this.router.navigate(['/home']);
      }
      
       
}
  
}






