/**
 * Created by damon on 4/27/17.
 */
import { Injectable }     from '@angular/core';
import {Http} from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  public url;  // URL to web API
  private port='3000';
  private baseUrl="http://"+this.url+":"+this.port;

  constructor (private http: Http,public storage:Storage) {
    //this.setEndPoint(this.server.getEndPoint());
    this.initSetEndPoint();
  }

  public initSetEndPoint(){
    this.storage.ready().then(() => {
      this.storage.get('endpoint').then((val) => {
        this.baseUrl="http://"+val+":"+this.port;
        this.getStatus ();
        this.getSw();
      })
    });
  }

  public setEndPoint(endPoint:string){
    //return this.url=endPoint;
    this.baseUrl="http://"+endPoint+":"+this.port;
    this.initSetEndPoint();
  }


  public getStatus (){

    return this.http.get(this.baseUrl+"/api?filter=");
  }

  public getSw(){
    return this.http.get(this.baseUrl+"/api/control");
  }

  public manualSwitch(device,sw){
    if(sw){
      sw="on";
    }else{
      sw="off";
    }
    return this.http.get(this.baseUrl+"/api/control/"+device+"?switch="+sw);
  }

}
