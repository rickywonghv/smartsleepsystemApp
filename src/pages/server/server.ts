import { Component } from '@angular/core';
import {  NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {HomePage} from "../home/home";
import {AppService} from "../../app/app.service";

/**
 * Generated class for the Server page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-server',
  templateUrl: 'server.html',
  providers:[HomePage]
})
export class ServerPage {
  public endpoint:string;
  private defaultEndpoint:string="127.0.0.1";
  private home;
  public storage;


  msg:string="End Point set to ";
  endpointInput:string;
  portInput:string;

  constructor(public navCtrl: NavController,public storageCon: Storage, public homepage:HomePage,private service:AppService) {

    this.initSetup(this.storageCon,this.homepage);
  }

  private initSetup(storageCon,homepage){
    this.home=homepage;
    this.storage=storageCon;
    this.storage.ready().then(() => {
      this.storage.get('endpoint').then((val) => {
        if(val==""||val==null){
          this.storage.set('endpoint',this.defaultEndpoint);
          this.endpoint=this.defaultEndpoint;
          this.home.presentToast(this.msg+this.defaultEndpoint);
        }else{
          this.endpoint=val;
          this.home.presentToast(this.msg+val);
        }
      })
    });
    this.endpointInput=this.endpoint;
  }


  public getEndPoint():string{
    return this.endpoint;
  }

  public setEndPoint(){
    if(this.endpointInput){
      this.storage.set('endpoint',this.endpointInput);
      this.service.setEndPoint(this.endpointInput);
      this.endpoint=this.endpointInput;
      this.home.presentToast(this.msg+this.endpointInput);
    }

  }



}
