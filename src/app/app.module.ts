import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler/*, ionicBootstrap*/ } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { MyApp } from './app.component';
//import { HttpClientModule } from '@angular/common/http';
//import { Http, HttpModule} from '@angular/http';
import {HTTP} from '@ionic-native/http';
//Import des pages de l'application
import { Accueil } from '../pages/accueil/accueil';
import { Droite } from '../pages/droite/droite';
import { ModifierPalox } from '../pages/modifierPalox/modifierPalox';
import { Gauche } from '../pages/gauche/gauche';
import { Milieu } from '../pages/milieu/milieu';
import { ListePalox } from '../pages/listePalox/listePalox';

//Import du module de QR-Code
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    Accueil,
    Droite,
    ModifierPalox,
    Gauche,
    Milieu,
    ListePalox
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule,
    FormsModule,
    //HttpModule,
    //HttpClientModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Accueil,
    Droite,
    ModifierPalox,
    Gauche,
    Milieu,
    ListePalox
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}

  ]
})
export class AppModule {}
