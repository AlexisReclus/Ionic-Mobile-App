import { Component } from '@angular/core';
import { NavController/*, ionicBootstrap*/ } from 'ionic-angular';

import { Droite } from '../droite/droite';
import { Gauche } from '../gauche/gauche';
import { Milieu } from '../milieu/milieu';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class Accueil {

  constructor(public navCtrl: NavController) {}

  PageDroite = Droite; //Recherche par types
  PageGauche = Gauche; //Recherche par ID
  PageMilieu = Milieu; //Recherche par QR Code

}//class Accueil
