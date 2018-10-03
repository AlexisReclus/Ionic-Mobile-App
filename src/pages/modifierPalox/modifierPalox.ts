import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';


@Component({
  selector: 'page-modifierPalox',
  templateUrl: 'modifierPalox.html'
})
export class ModifierPalox {
urlBase = 'http://raspberrypi.local:3000/api/boxes/';

  nID: any;
  data: any;
  addBottles = 0;
  newQty: any;

  listeCouleurs = [
    'Rouge',
    'Blanc'
  ];

  listeReferences = [
    'Château Luchey-Halde',
    'Les Haldes de Luchey'
  ];

  listeFormat = [
    'demi-bouteille',
    'bouteille',
    'magnum',
    'double magnum'
  ];

  constructor(public navCtrl: NavController,public navParams: NavParams, private http: HTTP) {
    this.nID = navParams.get('nID');
  } //constructor

  //this.newQty += this.addBottles;

  Enregistrer(){
    if(this.addBottles<0){
      this.http.patch(this.urlBase+'remove/'+this.nID+'/'+(-this.addBottles),{},{});
      //console.log(-this.addBottles);
    } else {
      this.http.patch(this.urlBase+'add/'+this.nID+'/'+this.addBottles,{},{});
      //console.log(this.addBottles);
    }
    
    //console.log("reference nouvelle : "+this.data.ref);
    this.http.patch(this.urlBase+'color/'+this.nID+'/'+this.data.color,{},{});
    this.http.patch(this.urlBase+'ref/'+this.nID+'/'+this.data.ref,{},{});
    this.http.patch(this.urlBase+'color/'+this.nID+'/'+this.data.color,{},{});
    this.http.patch(this.urlBase+'format/'+this.nID+'/'+this.data.format,{},{});


    /*if (this.data.ref!=null){
      this.data.ref = this.data.ref.replace(/\s/g,"%20");
      this.http.patch(this.urlBase+'ref/'+this.nID+'/'+this.data.ref,{},{});
    }*/

    this.http.patch(this.urlBase+'year/'+this.nID+'/'+this.data.year,{},{});

    //window.location.reload();
    this.navCtrl.pop();
    console.log(this.data.qty);
    //console.log('ref :' +this.data.ref);
  }

  ajouter(){
    this.addBottles++;
    this.onChange(this.addBottles);
  }

  soustraire(){
    this.addBottles--;
    this.onChange(this.addBottles);
  }

  onChange(newValue){
    this.newQty = this.data.qty + parseInt(newValue);
    this.addBottles = newValue;

    if(newValue == ""){
      this.newQty = this.data.qty + 0;
      this.addBottles = newValue;
      //console.log(typeof this.addBottles);
    } else {
      this.newQty = this.data.qty + parseInt(newValue);
      this.addBottles = newValue;
      //console.log(typeof this.addBottles);
    }//else
  }//onChange

  formulaireCouleur(){

  }

  ionViewWillEnter(){
    this.http.get(this.urlBase+'id/'+this.nID,{},{})
      .then(res=>JSON.parse(res.data))
      .then(response => {
        this.data = response;
        this.newQty = response.qty;
      })//then
  }//ionViewWillEnter
}//class TestPage
