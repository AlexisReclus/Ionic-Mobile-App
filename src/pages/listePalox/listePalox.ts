import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { ModifierPalox } from '../modifierPalox/modifierPalox';



@Component({
  selector: 'page-listePalox',
  templateUrl: 'listePalox.html'
})
export class ListePalox {
  urlBase = 'http://raspberrypi.local:3000/api/boxes/search/'
  couleur = null;
  ref: String[];
  format:string[];
  id: any;
  data: any;
  millesime = null;
  nID = null;
  msgError = null;

  constructor(public navCtrl: NavController,public navParams: NavParams, private http: HTTP,) {
    this.couleur = navParams.get('couleur');
    this.ref = navParams.get('ref');
    this.millesime = navParams.get('millesime');
    this.format = navParams.get('format');
    this.nID = navParams.get('nID');
  }//constructor


  Modifier(nID: String, couleur: String, millesime: String, format: String, nombre: any){
    this.navCtrl.push(ModifierPalox,{nID:nID});
  }

  ionViewWillEnter(){
    //console.log('nID:'+this.nID);
    if(this.nID != null){
      this.http.get('http://raspberrypi.local:3000/api/boxes/id/'+this.nID,{},{})
        .then(res=>JSON.parse(res.data))
        .then(response => {
          this.data = [response];
          //console.log(this.data);
        })//then
      }//if
    else {
      //console.log("ref :"+this.ref);
      //console.log("color :"+this.couleur);
      //console.log("year :"+this.millesime);
      this.http.get(this.urlBase+'color/'+this.couleur+'/ref/'+this.ref+'/year/'+this.millesime+'/format/'+this.format,{},{})
        .then(res=>JSON.parse(res.data))
          .then(response => {

            console.log(typeof response);
            if(response.length < 1){
              this.msgError = "Il n'y a pas de palox correspondant à votre recherche.";
            }
            else{
              this.data = response;
            }
            console.log('data: '+typeof this.data);
            this.data = response;
            //console.log(this.data);
          })//then
      }//else
    }//ionViewWillEnter

}//class TestPage
