import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { NavController, NavParams } from 'ionic-angular';

import { ListePalox } from '../listePalox/listePalox';

@Component({
  selector: 'page-milieu',
  templateUrl: 'milieu.html'
})
export class Milieu {

  searchQuery: string = '';
  listOfIds = [];
  searchList: any;
  msgError=null;


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP) {}


  ionViewWillEnter(){
    this.http.get('http://raspberrypi.local:3000/api/boxes',{},{})
      .then(res => JSON.parse(res.data))
      .then(json => {
        //console.log(json);
        json.forEach(palox => {
        if(this.listOfIds.indexOf(palox._id) === -1){
          this.listOfIds.push(palox._id);
        }//if
      })//forEach
    });//then
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.searchList = this.listOfIds;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.searchList = this.searchList.filter((item) => {
        /*let list = item.toLowerCase().indexOf(val.toLowerCase()) > -1;
        console.log("val :" + val);

        console.log("searchlist "+list);
        if(list === false){
          console.log("vide");
          this.msgError ="erreur";
        }
        else{
          console.log("plein");
          this.msgError = null;
        }*/
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })//filter
      if(this.searchList.length<1){
        this.msgError = "Il n'y a pas de palox correspondant à votre recherche.";
      }
      else{
        this.msgError = null;
      }
    }//if

  }

  push_page(nID : String){
    // Push the page with palox informations
    console.log(nID);
    this.navCtrl.push(ListePalox,{nID:nID});
  }

  //Fonction pour surligner le champ en rouge
  surligne(champ, erreur)
{
   if(erreur)
      document.getElementById('searchbar').style.backgroundColor = "#8B0000";
   else
      document.getElementById('searchbar').style.backgroundColor = "";
}

//Fonction pour vérifier le numéro ID et le mettre en rouge si ID non disponible
  verifNID(ev: any)
{
  //  set val to the value of the searchbar
    let val = ev.target.value;
    this.surligne(ev,true)

}
}
