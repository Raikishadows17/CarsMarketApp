import { Component } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MenuController,LoadingController,AlertController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Router } from '@angular/router';
import { element } from 'protractor';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  

  usuario:any;
  email:any;
  Tipo:any = 'Auto';

  Carro;
  Carros = [];
  
  all_calif = [];

  Cilindraje=null;
  Precio=null;
  Guardar_Cilindraje = null;
  Guardar_Precio = null;
  Modelo = null;
  Transmision = null;
  MarcaAuto = null;
  
  Precio_Moto=null;
  Guardar_Precio_Moto = null;

  Moto;
  Motos = [];

  Vendedor;

  countCal=0;
  CalifSum = 0;

  j = 0;
  y = 0;
  x = 0;



constructor(
            private afDB:AngularFireDatabase,
            private ofauth:AngularFireAuth,
            private menu:MenuController,
            private loader:LoadingController,
            private alert:AlertController,
            private router: Router
            ){
            

    //Funcion para llamar todos los datos de los carros con su respectivo usuario
      this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Auto").on('child_added', local => {
      if(local.val().Estado == 'Disponible'){
      this.Carro=local.val();
      this.Carros.splice(this.y,0,this.Carro);
      //this.Carros.push(local.val());
      }
      this.Carros.forEach( Ven => {
        //agregar calificacion
        if(Ven.all_calif){
          Ven.all_calif.forEach(element => {
            this.countCal = this.countCal +1;
            this.CalifSum = this.CalifSum + parseInt(element);
          });
          Ven["Calif"] = (this.CalifSum/(this.countCal)).toFixed();
          this.countCal = 0;
          this.CalifSum = 0;
        } else {
          Ven["Calif"] = "No existe calificacion";
        }
        //Agregar datos de usuarios
        Ven['VNombre']=''
        Ven['VTelefono']=''
        Ven['VEmail']=''
        Ven['VApellidos']=''
        
        this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
          Ven.VNombre=user.val().Nombre;
          Ven.VTelefono=user.val().Telefono;
          Ven.VEmail=user.val().Email;
          Ven.VApellidos=user.val().Apellidos;
        });

      });
      this.x = this.x + 1;
    });

    //Funcion que muestra los datos de las motos con sus respectios usuarios
  this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Moto").on('child_added', local => { 
    
    if(local.val().Estado == 'Disponible'){
    this.Moto=local.val();
    this.Motos.splice(this.y,0,this.Moto);
    //this.Motos.push(local.val());
    }

    this.Motos.forEach( Ven => {
        //Agregar Calificacion        
        if(Ven.all_calif){          
          Ven.all_calif.forEach(element => {
            this.countCal = this.countCal +1;
            this.CalifSum = this.CalifSum + parseInt(element);
          });          
          Ven["Calif"] = (this.CalifSum/(this.countCal)).toFixed();
          this.countCal = 0;
          this.CalifSum = 0;
        }else{
          Ven["Calif"] = "No existe calificacion";
        }
      //Agregar datos de usuarios

      Ven['VNombre']=''
      Ven['VTelefono']=''
      Ven['VEmail']=''
      Ven['VApellidos']=''
      
      this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
        Ven.VNombre=user.val().Nombre;
        Ven.VTelefono=user.val().Telefono;
        Ven.VEmail=user.val().Email;
        Ven.VApellidos=user.val().Apellidos;
      
      });

    });
    this.x = this.x + 1;

  });

}

/*selectAuto(){
   //suppose to direct to the description page? Carro.IdCarro
   this.router.navigate(['/publicacion']);
}*/

filtro(){  
  //metodo para filtrar solo autos
  var expr = /^([0-9])+$/;  
  this.Carros = [];
  
if(this.Cilindraje != null){
  if(this.Transmision != null){
    if(this.Modelo != null){
      if(this.Precio != null){
        if(expr.test(this.Precio) == true){  
          //this.Carros = []; 
        this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Auto").on('child_added', local => {
          if(local.val().Estado == 'Disponible'){      
            if(local.val().Precio <= this.Precio && this.Cilindraje == local.val().Cilindraje && this.Transmision == local.val().Transmicion && this.Modelo == local.val().Modelo){
              this.Carro=local.val();
              this.Carro["Count"] = this.x;
              this.Carros.splice(this.y,0,this.Carro);      
            }
          }

        this.Carros.forEach( Ven => {
          Ven['VNombre']=''
          Ven['VTelefono']=''
          Ven['VEmail']=''
          Ven['VApellidos']=''
      
          this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
            Ven.VNombre=user.val().Nombre;
            Ven.VTelefono=user.val().Telefono;
            Ven.VEmail=user.val().Email;
            Ven.VApellidos=user.val().Apellidos;
          });

        });  
        this.x = this.x + 1;
 
        });
          }else{
            this.campoNumeric()
          }
      }else{   //if precio
        this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Auto").on('child_added', local => {
        if(local.val().Estado == 'Disponible'){      
          if(this.Cilindraje == local.val().Cilindraje && this.Transmision == local.val().Transmicion  && this.Modelo == local.val().Modelo){
            this.Carro=local.val();
            this.Carro["Count"] = this.x;
            this.Carros.splice(this.y,0,this.Carro);      
          }
        }

          this.Carros.forEach( Ven => {
          Ven['VNombre']=''
          Ven['VTelefono']=''
          Ven['VEmail']=''
          Ven['VApellidos']=''
      
            this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
              Ven.VNombre=user.val().Nombre;
              Ven.VTelefono=user.val().Telefono;
              Ven.VEmail=user.val().Email;
              Ven.VApellidos=user.val().Apellidos;
            });

        });
        this.x = this.x + 1;

        });

}

  }else { //if Modelo
    this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Auto").on('child_added', local => {
      if(local.val().Estado == 'Disponible'){      
        if(this.Cilindraje == local.val().Cilindraje && this.Transmision == local.val().Transmicion){
          this.Carro=local.val();
          this.Carro["Count"] = this.x;
          this.Carros.splice(this.y,0,this.Carro);      
        }
      }

        this.Carros.forEach( Ven => {
        Ven['VNombre']=''
        Ven['VTelefono']=''
        Ven['VEmail']=''
        Ven['VApellidos']=''
    
          this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
            Ven.VNombre=user.val().Nombre;
            Ven.VTelefono=user.val().Telefono;
            Ven.VEmail=user.val().Email;
            Ven.VApellidos=user.val().Apellidos;
          });

      });
      this.x = this.x + 1;

      });

  } 
}else{ //if transmision
  this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Auto").on('child_added', local => {
    if(local.val().Estado == 'Disponible'){      
      if(this.Cilindraje == local.val().Cilindraje){
        this.Carro=local.val();
        this.Carro["Count"] = this.x;
        this.Carros.splice(this.y,0,this.Carro);      
      }
    }

      this.Carros.forEach( Ven => {
      Ven['VNombre']=''
      Ven['VTelefono']=''
      Ven['VEmail']=''
      Ven['VApellidos']=''
  
        this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
          Ven.VNombre=user.val().Nombre;
          Ven.VTelefono=user.val().Telefono;
          Ven.VEmail=user.val().Email;
          Ven.VApellidos=user.val().Apellidos;
        });

    });
    this.x = this.x + 1;

    });
}

}else{  //if cilindraje
  //if para transmision y modelo
 if(this.Transmision != null && this.Modelo != null){
  this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Auto").on('child_added', local => {
    if(local.val().Estado == 'Disponible'){      
      if(this.Transmision == local.val().Transmicion && this.Modelo == local.val().Modelo){
        this.Carro=local.val();
        this.Carro["Count"] = this.x;
        this.Carros.splice(this.y,0,this.Carro);      
      }
    }

      this.Carros.forEach( Ven => {
      Ven['VNombre']=''
      Ven['VTelefono']=''
      Ven['VEmail']=''
      Ven['VApellidos']=''
  
        this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
          Ven.VNombre=user.val().Nombre;
          Ven.VTelefono=user.val().Telefono;
          Ven.VEmail=user.val().Email;
          Ven.VApellidos=user.val().Apellidos;
        });

    });
    this.x = this.x + 1;

    });
 }else{
  if(this.Transmision != null){
    this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Auto").on('child_added', local => {
      if(local.val().Estado == 'Disponible'){      
        if(this.Transmision == local.val().Transmicion){
          this.Carro=local.val();
          this.Carro["Count"] = this.x;
          this.Carros.splice(this.y,0,this.Carro);      
        }
      }
  
        this.Carros.forEach( Ven => {
        Ven['VNombre']=''
        Ven['VTelefono']=''
        Ven['VEmail']=''
        Ven['VApellidos']=''
    
          this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
            Ven.VNombre=user.val().Nombre;
            Ven.VTelefono=user.val().Telefono;
            Ven.VEmail=user.val().Email;
            Ven.VApellidos=user.val().Apellidos;
          });
  
      });
      this.x = this.x + 1;
  
      });
   }else{
    if(this.Precio != null){
      if(expr.test(this.Precio) == true){  
        //this.Carros = []; 
      this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Auto").on('child_added', local => {
        if(local.val().Estado == 'Disponible'){      
            if(local.val().Precio <= this.Precio){
            this.Carro=local.val();
            this.Carro["Count"] = this.x;
  
            this.Carros.splice(this.y,0,this.Carro);      
            }
      }
    
        this.Carros.forEach( Ven => {
          Ven['VNombre']=''
          Ven['VTelefono']=''
          Ven['VEmail']=''
          Ven['VApellidos']=''
          
          this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
            Ven.VNombre=user.val().Nombre;
            Ven.VTelefono=user.val().Telefono;
            Ven.VEmail=user.val().Email;
            Ven.VApellidos=user.val().Apellidos;
          });
    
        });
        this.x = this.x + 1;
  
      });  
    }else{
      this.campoNumeric();
    }
  
    }else{        
      this.Open_Complet_Alert();
    }
   }



  
 }
  
}

}

async campoNumeric(){
  let numer = await this.alert.create({
    header:"ATENCION",
    message:"El campo precio solo permite caracteres numericos",
    buttons:['OK']
  })

  numer.present();
}

Mostrar_Autos_Todos(){

this.Cilindraje = null;
this.Precio = null;
this.Transmision = null;
this.Modelo = null;

this.Carros = [];

  this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Auto").on('child_added', local => {
    if(local.val().Estado == 'Disponible'){
    this.Carro=local.val();
    this.Carro["Count"] = this.x;

    this.Carros.splice(this.y,0,this.Carro);
    }

    this.Carros.forEach( Ven => {
      Ven['VNombre']=''
      Ven['VTelefono']=''
      Ven['VEmail']=''
      Ven['VApellidos']=''
      
      this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
        Ven.VNombre=user.val().Nombre;
        Ven.VTelefono=user.val().Telefono;
        Ven.VEmail=user.val().Email;
        Ven.VApellidos=user.val().Apellidos;
      });

    });
    this.x = this.x + 1;

  });

}

Filtro_Moto(){  
  this.Guardar_Precio_Moto = this.Precio_Moto;
  var expr = /^([0-9])+$/;  
  this.Motos = [];
  if(this.Transmision != null){
    if(this.Modelo != null){
      if(this.Precio_Moto !=null){
        if(expr.test(this.Precio_Moto) == true){  
          //this.Motos = [];
        this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Moto").on('child_added', local => {     
          if(local.val().Estado == 'Disponible'){
          if(local.val().Precio <= this.Precio_Moto && this.Transmision == local.val().Transmicion && this.Modelo == local.val().Modelo){
            this.Moto=local.val();
            this.Moto["Count"] = this.x;
    
            this.Motos.splice(this.y,0,this.Moto);
          }
        }
      
          this.Motos.forEach( Ven => {
            Ven['VNombre']=''
            Ven['VTelefono']=''
            Ven['VEmail']=''
            Ven['VApellidos']=''
            
            this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
              Ven.VNombre=user.val().Nombre;
              Ven.VTelefono=user.val().Telefono;
              Ven.VEmail=user.val().Email;
              Ven.VApellidos=user.val().Apellidos;        
            });
          });  
          this.x = this.x + 1;
    
        });  
    
      }else{
        this.campoNumeric();
      }  
    
      }else{
        this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Moto").on('child_added', local => {
          if(local.val().Estado == 'Disponible'){
            if( this.Modelo == local.val().Modelo &&  this.Transmision == local.val().Transmicion){
              this.Moto=local.val();
              this.Moto["Count"] = this.x;
      
              this.Motos.splice(this.y,0,this.Moto);
            }
          }
          this.Motos.forEach( Ven => {
            Ven['VNombre']=''
            Ven['VTelefono']=''
            Ven['VEmail']=''
            Ven['VApellidos']=''
            
            this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
              Ven.VNombre=user.val().Nombre;
              Ven.VTelefono=user.val().Telefono;
              Ven.VEmail=user.val().Email;
              Ven.VApellidos=user.val().Apellidos;        
            });
          });  
          this.x = this.x + 1;
        });
      
      }
    }else{
      this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Moto").on('child_added', local => {
        if(local.val().Estado == 'Disponible'){
          if( this.Transmision == local.val().Transmicion){
            this.Moto=local.val();
            this.Moto["Count"] = this.x;
    
            this.Motos.splice(this.y,0,this.Moto);
          }
        }
        this.Motos.forEach( Ven => {
          Ven['VNombre']=''
          Ven['VTelefono']=''
          Ven['VEmail']=''
          Ven['VApellidos']=''
          
          this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
            Ven.VNombre=user.val().Nombre;
            Ven.VTelefono=user.val().Telefono;
            Ven.VEmail=user.val().Email;
            Ven.VApellidos=user.val().Apellidos;        
          });
        });  
        this.x = this.x + 1;
      });
    }
  }else{
    if(this.Precio_Moto != null){
      if(expr.test(this.Precio_Moto) == true){
        this.Motos = [];
        this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Moto").on('child_added', local => {     
          if(local.val().Estado == 'Disponible'){
          if(local.val().Precio <= this.Precio_Moto){
            this.Moto=local.val();
            this.Moto["Count"] = this.x;
            this.Motos.splice(this.y,0,this.Moto);
          }
        }
      
          this.Motos.forEach( Ven => {
            Ven['VNombre']=''
            Ven['VTelefono']=''
            Ven['VEmail']=''
            Ven['VApellidos']=''
            
            this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
              Ven.VNombre=user.val().Nombre;
              Ven.VTelefono=user.val().Telefono;
              Ven.VEmail=user.val().Email;
              Ven.VApellidos=user.val().Apellidos;        
            });
          });
          this.x = this.x + 1;
        });  
    
      }else{
        this.campoNumeric();
      }  
    
      }else{
        this.Open_Complet_Alert();
      }
      }
    }
  



Mostrar_Motos_Todos(){
this.Precio_Moto = null;
this.Motos = [];
this.Transmision = null;
this.Modelo = null;

  this.afDB.database.ref('Carros/').orderByChild("Tipo").equalTo("Moto").on('child_added', local => { 
    
    if(local.val().Estado == 'Disponible'){
    this.Moto=local.val();
    this.Moto["Count"] = this.x;

    this.Motos.splice(this.y,0,this.Moto);
    }

    this.Motos.forEach( Ven => {
      Ven['VNombre']=''
      Ven['VTelefono']=''
      Ven['VEmail']=''
      Ven['VApellidos']=''
      
      this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
        Ven.VNombre=user.val().Nombre;
        Ven.VTelefono=user.val().Telefono;
        Ven.VEmail=user.val().Email;
        Ven.VApellidos=user.val().Apellidos;
      
      });

    });
    this.x = this.x + 1;

  });

}

async Open_Complet_Alert(){
 let alert = await this.alert.create({
   header:'AVISO',
   message:'Para realizar el filtrado un campo debe tener valor',
   buttons:['OK']
 });

alert.present()
}

OpenMenu() {
  this.menu.enable(true, 'menu');
  this.menu.open('menu');
}
help_ra(){
  this.router.navigate(["/funcionra"]);
}

}
