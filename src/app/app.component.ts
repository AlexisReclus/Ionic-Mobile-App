import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { Accueil } from '../pages/accueil/accueil';
//import { RechercheID } from '../pages/recherche_id/recherche_id';
//import { QRCodePage } from '../pages/QRCode/QRCode';
//import { InfoPalox } from '../pages/info-palox/info-palox';
//import { ModifierInfoPalox } from '../pages/modifier-info-palox/modifier-info-palox';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make Accueil the root (or first) page
  rootPage = Accueil;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  myColor = "blue";
}
