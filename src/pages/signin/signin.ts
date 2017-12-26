import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../services/auth";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, 
    private loadingController: LoadingController, private AlertController: AlertController) {
  }

  onSignin(form: NgForm){
    let loader = this.loadingController.create({
      content: "Du wirst angemeldet..."
    });
    loader.present();
    this.authService.signin(form.value.email, form.value.password)
    .then((data)=> {
      loader.dismiss();
      
    }  )
    .catch((error) => {
      loader.dismiss();
      let errorAlert = this.AlertController.create({
        title: 'OH NEIN!!!! - Etwas ist schiefgegangen...',
        message: error.message,
        buttons: ['Mist...']
      });
      errorAlert.present();
    });
  }

}
