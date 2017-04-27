import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import {ServerPage} from "../server/server";

@Component({
  templateUrl: 'tabs.html',
  providers:[HomePage,ServerPage]
})
export class TabsPage {
  img="./icon/circuit.svg";
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ServerPage;

  constructor() {

  }
}
