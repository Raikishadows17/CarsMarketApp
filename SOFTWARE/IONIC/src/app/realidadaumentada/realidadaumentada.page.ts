import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-realidadaumentada',
  templateUrl: './realidadaumentada.page.html',
  styleUrls: ['./realidadaumentada.page.scss'],
})
export class RealidadaumentadaPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    

    
  }
  close(){
    this.modalCtrl.dismiss();
  }

}
