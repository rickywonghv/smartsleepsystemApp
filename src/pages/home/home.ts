import { Component } from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {AppService} from "../../app/app.service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public temperature;
  public humidity;
  public airconSw:boolean;
  public fanSw:boolean;
  public heaterSw:boolean;
  public windowSw:boolean;
  public air;


  constructor(public navCtrl: NavController,public service:AppService,private toastCtrl: ToastController,public storage:Storage) {
    service.initSetEndPoint();
    this.temperature="Loading";
    this.humidity="Loading";
     new Promise(resolve => {
      setTimeout(() => resolve(this.getStatus()), 30000);
    });
    new Promise(resolve => {
      setTimeout(() => resolve(this.getSwitch()), 15000);
    });
  }

  public presentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  public reload(){
    this.getStatus();
    this.getSwitch();
  }

  public getStatus(){
    return this.service.getStatus().subscribe(res=>this.statusJson(res.json()),err=>this.presentToast("Server End Point Error"));
  }

  public getSwitch(){
    return this.service.getSw().subscribe(res=>this.swJson(res.json()));
  }

  public swSet(device,sw:boolean){
    this.service.manualSwitch(device,sw).subscribe(res=>this.swSuccess(device,sw),error=>this.swError(device,error));
  }

  public swError(device,err){
    this.getSwitch();
    if(device=="aircon"){
      device="Air-Con";
    }
    if(device=="heater"){
      device="Heater";
    }
    if(device=="fan"){
      device="Fan";
    }
    this.presentToast(device+" Error!");
  }

  public swSuccess(device,sw){
    //this.getSwitch();
    if(device=="aircon"){
      device="Air-Con";
    }
    if(device=="heater"){
      device="Heater";
    }
    if(device=="fan"){
      device="Fan";
    }

    if(sw){
      sw="On";
    }else{
      sw="off";
    }
    this.presentToast(device+" is "+sw);
  }

  public swJson(json){
    this.airconSw=json.airCon;
    this.fanSw=json.fan;
    this.heaterSw=json.heater;
    this.windowSw=json.window;
    //this.presentToast("Air-Con is "+this.airconSw);
  }

  public statusJson(json:any){
    this.temperature=json.temperature;
    this.humidity=json.humidity;
    this.air=json.air;
  }

}
