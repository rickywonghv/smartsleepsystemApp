import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import {ServerPage} from "../server/server";
import {AppService} from "../../app/app.service";

@Component({
  templateUrl: 'tabs.html',
  providers:[HomePage,ServerPage]
})
export class TabsPage {
  img="./icon/circuit.svg";
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ServerPage;

  constructor(public service:AppService,public storage:Storage) {
    service.initSetEndPoint();
  }
}
