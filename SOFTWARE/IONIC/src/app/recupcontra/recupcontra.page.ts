import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-recupcontra',
  templateUrl: './recupcontra.page.html',
  styleUrls: ['./recupcontra.page.scss'],
})
export class RecupcontraPage implements OnInit {

  constructor(public afDB:AngularFireDatabase,
              public alertCtrl:AlertController,
              public ofAuth:AngularFireAuth,
              private router:Router
              ){ 

              }

  ngOnInit() {
  }

recupcontra(email,email2){

    if(email==email2){

  this.ofAuth.auth.sendPasswordResetEmail(email).then(recup => {
    
    this.Alert();

  });
   
}else{
this.Erro();
}

  }

  async Erro(){
    const erro = await this.alertCtrl.create({
      header:"ATENCION",
      message:"Los email no coinciden"
    })
    await erro.present();
  }

  async Alert(){
    const alert = await this.alertCtrl.create({
      header:'ATENCION',
      message:'Se ha enviado un mensaje a tu correo electronico',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          console.log('Ok clicker');
          this.router.navigate(['/login']);
        }
      },
    ]
    });
    await alert.present();

  }

}
