import { Component, OnInit } from '@angular/core';
import { ToastController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  user = {} as User;
  usuario:any=[];
  email=null;
  nombre=null;
  apellido=null;
  LenTel=null;

  id=Date.now();


  constructor(private ofauth:AngularFireAuth, 
              public toastCtrl:ToastController,
              public afDB:AngularFireDatabase,
              public alertc:AlertController,
              private router:Router) {
            
               }

  ngOnInit() {
  }

  async registrar(user: User){
  
    var expr = /^([0-9])+$/;
    var exprSololetra = /^[a-zA-Z\s]+$/;

    console.log(exprSololetra.test(this.usuario.nombre));

    console.log(user)

if(exprSololetra.test(this.usuario.nombre) == true && exprSololetra.test(this.usuario.Apellidos) == true){


  if(expr.test(this.usuario.ntelefono) == true){
    
    var ntelefonoLeng = this.usuario.ntelefono.toString();

    console.log(ntelefonoLeng.length);
    if(ntelefonoLeng.length == 10){
  
      if(user.password==this.usuario.passwordconfirm){
      await this.ofauth.auth.createUserWithEmailAndPassword(user.email,user.password).then(res =>{
        this.ofauth.authState.subscribe(auth =>{
                     this.email=user.email;
                     this.afDB.object('usuarios/'+auth.uid).set({
                      Nombre:this.usuario.nombre,
                      Apellidos:this.usuario.Apellidos,
                      Telefono:this.usuario.ntelefono,
                      Email:user.email,
                      Tipo:'Usuario',
                      TVentas:0
                      
                    })
                    
                });
    
          this.Toast(); 

          this.router.navigate(['/login']);
    
      }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.name;
      var errorMessage = error.message;
    
      if (error.message=='Password should be at least 6 characters'){
        alert('La contraseña debe tener un  minimo de 6 carcateres');
      }
      if (error.message=='The email address is already in use by another account.'){
        alert('El email ya esta en uso por otra cuenta');
      }
      if (error.message=='The email address is badly formatted.'){
        alert('Email invalido');
      }
      if (error.message=='Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.'){
        alert('La cuenta de correo electrónico no esta habilitada, Active la cuenta en su correo electrónico');
      }
    
      console.log(error);
    });
    
    this.ofauth.auth.applyActionCode(user.email);
    
    this.ofauth.auth.currentUser.sendEmailVerification().then(() =>{
      this.ofauth.auth.signOut();
    
    this.CorreoAlert();

    console.log('se envio correo electronico')
    }).catch((error)=>{
      
    });
  
      }else{
        const pass = await this.alertc.create({
          header:'ATENCION',
          message:'Las contraseñas no coinciden',
          buttons:[{
            text:'OK',
            handler: () =>{
    
            }
          }]
        });
    
       pass.present(); 
      }
  
    }else{
  
      this.LenTel = this.usuario.ntelefono.length;
  
      const tel = await this.alertc.create({
        header:'ATENCION',
        message:'El numero de telefono debe tener 10 caracteres',
        buttons:[{
          text:'OK',
          handler: () =>{
  
          }
        }]
      });
  
     await tel.present(); 
    }
  
  }else{
  
    const exptel = await this.alertc.create({
      header:'!ATENCION¡',
      message:'El campo de numero de telefono solo admite digitos',
      buttons:[{
        text:'OK',
        handler: () =>{
    
        }
      }]
    });
   await exptel.present();
  
  }

}else{

  const expoLetra = await this.alertc.create({
    header:'!ATENCION¡',
    message:'El campo de nombre y apellido solo admite letras',
    buttons:[{
      text:'OK',
      handler: () =>{
  
      }
    }]
  });

  await expoLetra.present();
}

    }

    async Toast(){
      const toast = await this.toastCtrl.create({
        message: 'EL usuario se creo correctamente',
        duration: 3000,
        position: 'top'
          });
        toast.present();
    }

    async CorreoAlert(){
      
    const correo = await this.alertc.create({
      header:'!ATENCION¡',
      message:'Se ha enviado un mensaje de activacion a tu correo electronico',
      buttons:[{
        text:'OK',
        handler: () =>{
    
        }
      }]
    });
    await correo.present();
    }

}
