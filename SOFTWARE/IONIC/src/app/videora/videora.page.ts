import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Platform,ActionSheetController } from '@ionic/angular';
import {
  MediaCapture,
  MediaFile,
  CaptureError,
  CaptureVideoOptions
} from '@ionic-native/media-capture/ngx';
import { AlertController } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx'
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';

import { AngularFireDatabase } from 'angularfire2/database';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import{ InAppBrowser, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-videora',
  templateUrl: './videora.page.html',
  styleUrls: ['./videora.page.scss'],
})
export class VideoraPage implements OnInit {
  @ViewChild('myvideo') myvideo: any;
  videoURL: any = '';  

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
  
    private mediaCapture: MediaCapture,     
    private file: File, 
    private media: Media,
    private storage: AngularFireStorage,
    private actionSheetController: ActionSheetController,
    private plt: Platform,
    public camera:Camera,
    public alec:AlertController,
    public afDB:AngularFireDatabase,
    public webview: WebView,
    private theInAppBrowser: InAppBrowser

   
  ) {

   }

  ngOnInit() {
    
  }
  
  
  takeVideo(){
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 50,
      quality: 100
    };
    this.mediaCapture.captureVideo(options).then(
      (data: MediaFile[]) => {
        let captureVid = data[0];
        let localVideoPath = captureVid.fullPath;
        let directoryPath  = localVideoPath.substr(0, localVideoPath.lastIndexOf('/'));
        let fileName = localVideoPath.substr(localVideoPath.lastIndexOf('/') + 1);
        
        alert('Se  grabo el video correctamente' +localVideoPath);
  
        this.file.readAsArrayBuffer(directoryPath,fileName).then((result) => {
          console.log(result);
          //let blob = new Blob([result], {type: "video/mp4"});
          alert('Se a grabado ' +result);
        })
      }
    )
  }

  async addVideo(){
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.VIDEO
    }
    this.camera.getPicture(options).then((videoData) => {
      let url = this.webview.convertFileSrc(videoData);

      let video = this.myvideo.nativeElemnt;
      video.src = url;
      video.play();
    }, (err) => {
      alert(err)
      console.error(err);
    });
  }
  openWithSystemBroser(url: string){
    let target = "_system";
    this.theInAppBrowser.create(url, target,this.options);
   }
    
  }
