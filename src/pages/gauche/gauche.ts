import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { NavController, NavParams/*, ionicBootstrap*/ } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { ListePalox } from '../listePalox/listePalox';


@Component({
  selector: 'page-gauche',
  templateUrl: 'gauche.html'
})

export class Gauche {
  urlBase = 'http://raspberrypi.local:3000/api/boxes/';
  couleurs = [];

  ref = [
    'Château Luchey-Halde',
    'Les Haldes de Luchey'
  ];

  millesime = [];

  format = [
    'demi-bouteille',
    'bouteille',
    'magnum',
    'double magnum'
  ];

  demande = {
    'couleur' : null,
    'ref' : null,
    'millesime' : null,
    'format' : null,
  };

  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {
    platform.ready()
      .then(() => {
        this.http.get(this.urlBase,{},{})
          .then(res => JSON.parse(res.data))
          .then(json => {
            json.forEach(palox => {
              if(this.couleurs.indexOf(palox.color) === -1){
                  this.couleurs.push(palox.color);
              }
              if(this.millesime.indexOf(palox.year) === -1){
                this.millesime.push(palox.year);
              }//if millesime
            })//forEach
            this.millesime.sort(function(a, b) {
              return a - b;
            });
          })//then json
      })//then ready
  } //constructor

  logForm() {
    //console.log(this.demande);
  }

  //Fonction pour trouver le vin en fonction de sa couleur
  findWine(){
    if (this.demande.ref!=null){
      console.log(this.demande.ref);
      this.demande.ref = this.demande.ref.replace(/\s/g,"%20");
    }
    
    this.navCtrl.push(ListePalox,{couleur:this.demande.couleur,millesime:this.demande.millesime,format:this.demande.format,nID:null, ref:this.demande.ref});

  }

  resetOptions(){
    this.demande.couleur = null;
    this.demande.ref = null;
    this.demande.millesime = null;
    this.demande.format = null;
  }

}//class TestPage
