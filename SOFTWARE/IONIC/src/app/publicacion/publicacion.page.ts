import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { AngularFireDatabase  } from 'angularfire2/database';
import { Platform, NavController, AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import{ InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';

declare var google: any

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
  
})
export class PublicacionPage implements OnInit {
  
  IdCarro: any;
  IdMoto: any;


  map : any;  //manejador del mapa
  coords: any = {lat: 0, lng: 0};

  


  
  Carros= [];
  Carro;
  Comentarios:any = [];
  Comentario;
  Moto;
  Motos = [];

  Vendedor;
  countCal=0;
  CalifSum = 0;
  all_calif = [];
  y = 0;
  w = 0;
  j = 0;
  x = 0;
  idComentario = Date.now();
  usuario:any;


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

  constructor(
    public navCtrl: NavController, 
    public platform: Platform,
    private ofauth:AngularFireAuth,
    private afDB:AngularFireDatabase,
  private activateRoute: ActivatedRoute,
  private geolocation: Geolocation,
  private router:Router,
  private callNumber: CallNumber,
  public alec:AlertController,
  private theInAppBrowser: InAppBrowser
  ) {


   


   }


  ngOnInit() {

    this.ofauth.authState.subscribe( auth => {
      this.usuario = auth.uid;
      console.log(auth.uid);
    
      
        
      
    });
    this.loadAuto();
    this.loadComent();
    this.loadMap();
    
  }
  loadComent(){
    this.IdCarro = this.activateRoute.snapshot.paramMap.get("id");

    let idc: string = this.IdCarro;
    this.afDB.database.ref('Comentarios/').orderByChild("IdCarro").equalTo(idc).on('child_added', datos =>{
      this.Comentario = datos.val();
      console.log(datos.val());
      this.Comentarios.splice(this.w,0,this.Comentario);

      this.Comentarios.forEach( Ven => {
        Ven['Nombre']=''
        Ven['Apellidos']=''
  
        this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', duser => {
          Ven.Nombre=duser.val().Nombre;
          Ven.Apellidos=duser.val().Apellidos;
          console.log(duser.val());
        });
      });
    });
    
  }
  loadAuto(){

    this.IdCarro = this.activateRoute.snapshot.paramMap.get("id");
    console.log("IdCarro", this.IdCarro);
    let idp : string = this.IdCarro;
    if(this.IdCarro){
     
      this.afDB.database.ref('Carros/'+idp).on('value', auto => {
        this.Carro = auto.val();
        console.log(auto.val());
        
        this.Carros.splice(this.y,0,this.Carro);
        //this.Carros.push(auto.val());
        
        
        
        this.Carros.forEach( Ven => {

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
          Ven['VPerfil']= ''
          
          this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
            Ven.VNombre=user.val().Nombre;
            Ven.VTelefono=user.val().Telefono;
            Ven.VEmail=user.val().Email;
            Ven.VApellidos=user.val().Apellidos;
            Ven.VPerfil=user.val().Perfil;
            console.log(user.val());
          });
          
        });
      

     });
    //}
    
  }
}

  loadMap(){
    this.IdCarro = this.activateRoute.snapshot.paramMap.get("id");
    console.log("IdCarro", this.IdCarro);
    let idp : string = this.IdCarro;
    if(this.IdCarro){
     
      this.afDB.database.ref('Carros/'+idp).on('value', auto => {
        this.coords.lat = auto.val().latitud;
        this.coords.lng = auto.val().longitud;
       
        console.log(this.coords);

     });
    }
  }

 /*gotoRA(){
  this.router.navigate(['/realidadaumentada']);
 }*/

 callTel(phoneNumber: string){
  this.callNumber.callNumber(phoneNumber, true)
  .then( () => console.log("Llamada exitosa!"))
  .catch( () => console.log("Error al intentar llamar"));
 }
 
 async agregarComentario(){
  this.IdCarro = this.activateRoute.snapshot.paramMap.get("id");
  let idp : string = this.IdCarro;
  this.idComentario = this.idComentario;
  if(this.Comentarios.coment == null){
    const cap = await this.alec.create({
      header:'ATENCION',
      message:'Se debe llenar el campo de comentario!',
      buttons:['OK']
    });
    await cap.present();
  
  }else{
    this.ofauth.authState.subscribe(auth =>{
    this.afDB.database.ref('Comentarios/'+this.idComentario).set({
      IdComentario: this.idComentario,
      IdCarro:this.IdCarro,
      Coment: this.Comentarios.coment,
      Vendedor:auth.uid,
     });
    alert("Su comentario se subio con exito!");
    });
    location.assign('/publicacion/'+idp)

  }
 }
 Calificar_Car(Calif,IdCarro){
  console.log(Calif,IdCarro);
  this.IdCarro = this.activateRoute.snapshot.paramMap.get("id");
  let idp : string = this.IdCarro;
  this.afDB.database.ref('Carros/'+idp).on('value', local => {
  
      if(local.val().IdCarro == IdCarro){
        this.Carro = local.val();
        console.log(this.Carro);
        if(this.Carro.all_calif){
          this.all_calif = this.Carro.all_calif;
          console.log(this.Carro.all_calif);
        }
        this.all_calif.push(Calif);
        console.log(this.all_calif,'Pasa');
      }
      
    
  });
  this.afDB.database.ref('Carros/'+ IdCarro).update({all_calif: this.all_calif});
  this.all_calif = [];
  this.Recargar_CarrPage();
 }
 Recargar_CarrPage(){
  console.log('Actualizacion');
  this.Carros = [];
  this.IdCarro = this.activateRoute.snapshot.paramMap.get("id");
  let idp : string = this.IdCarro;
  this.afDB.database.ref('Carros/'+idp).on('value', local => {
    if(local.val().IdCarro == idp){
      //this.Carros.push(local.val());
      this.Carro = local.val();
        console.log(local.val());
        
        this.Carros.splice(this.y,0,this.Carro);
    }
   
    this.Carros.forEach( Ven => {                

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

      //console.log(Ven.IdCarro,Ven.Calif);

      //Agregar datos de usuarios
      Ven['VNombre']=''
      Ven['VTelefono']=''
      Ven['VEmail']=''
      Ven['VApellidos']=''
      Ven['VPerfil']= ''
      
      this.afDB.database.ref('usuarios/'+Ven.Vendedor).on('value', user => { 
        Ven.VNombre=user.val().Nombre;
        Ven.VTelefono=user.val().Telefono;
        Ven.VEmail=user.val().Email;
        Ven.VApellidos=user.val().Apellidos;
        Ven.VPerfil=user.val().Perfil;
      });

    });

    this.x = this.x + 1;

  });
 
  
 }
 openWithSystemBroser(url: string){
  let target = "_system";
  this.theInAppBrowser.create(url, target,this.options);
 }

 async eliminarComentario(IdComentario){
  console.log(IdComentario);

  
  const elim = await this.alec.create({
    header:'ATENCION',
    message:'¿Esta seguro que deseas eliminar el comentario?',
    buttons:[{
      text:'SI',
      handler: () => {
        this.afDB.database.ref('Comentarios/'+IdComentario).remove();
        //this.navCtrl.setRoot(this.navCtrl.getActive().component);//actualiza los datos, recarga la pagina
        //this.router.navigate(['/autoventa']);
        alert("Su comentario a sido borrado!");
        location.reload();
       
      }
    },{
      text:'NO',
      handler: () => {
        
      }
    }
    
  ]
  })
  await elim.present();  

 }
}
