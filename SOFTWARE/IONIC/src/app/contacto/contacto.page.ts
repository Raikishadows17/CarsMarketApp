import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {

  constructor(private menu:MenuController) { }

  ngOnInit() {
  }

  OpenMenu() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }

}
