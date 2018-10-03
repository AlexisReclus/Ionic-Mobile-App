import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

import { ModifierPalox } from '../modifierPalox/modifierPalox';

@Component({
  selector: 'page-droite',
  templateUrl: 'droite.html'
})

export class Droite {
  scannedCode = null;
  msgErreur = null;

  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner, private http: HTTP) { }

  //Fonction pour push une page
  push_page(nID : String){
    this.navCtrl.push(ModifierPalox, {nID : nID}); // Push the page with palox informations
  }

  //Verification de l'ID sur le QR Code
  checkId(ID){
    return new Promise((resolve, reject)=>{
    let ret = false;
    this.http.get('http://raspberrypi.local:3000/api/boxes',{},{})
      .then(res => JSON.parse(res.data))
      .then(json => {
          json.forEach(palox => {
            if(palox._id == ID){
              ret = true;
              resolve(ret);
            }//if
          })//forEach
          resolve(ret);
        }) //then
      });
  }//checkId

  //Fonction pour scanner un QR-Code
  scanCode() {
    this.barcodeScanner.scan()
      .then(barcodeData => {
        this.scannedCode = barcodeData.text;
        this.http.get('http://raspberrypi.local:3000/api/boxes',{},{})
        .then(res => JSON.parse(res.data))
        .then(json => {

            json.some(palox => {
              if(palox._id == barcodeData.text ){
                this.msgErreur =  null;
                return true;

              }
              else{
                this.msgErreur = "Il n'y a pas de palox correspondant à votre recherche.";
              }
            });
            if(this.msgErreur === null){
              this.push_page(barcodeData.text);
            }

          });
        });
      }//scannedCode

}//class QRCode
