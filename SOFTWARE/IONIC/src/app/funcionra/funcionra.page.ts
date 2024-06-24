import { Component, OnInit } from '@angular/core';
import { Platform,AlertController,MenuController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-funcionra',
  templateUrl: './funcionra.page.html',
  styleUrls: ['./funcionra.page.scss'],
 
})


export class FuncionraPage {
  pdfObject: any;

  constructor(
    public platform: Platform
  ){
    
  }
  
}
