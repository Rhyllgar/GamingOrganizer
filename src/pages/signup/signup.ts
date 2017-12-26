import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LoadingController, AlertController } from "ionic-angular";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {
  constructor(private authService: AuthService, private loadingController: LoadingController, private alertController: AlertController) { }


  onSignup(form: NgForm) {
    const loading = this.loadingController.create({
      content: "Wirst gerade angemeldet..."
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password).then((data) => {
      console.log(data);
      loading.dismiss();
      const successAlert = this.alertController.create({
        title: "HURRA!",
        message: 'Es ist vollbracht! Du bist nun bei dieser formdiblen Applikation angemeldet!',
        buttons: ['Super!!!!!!!!1elf']      
      })
      successAlert.present();
    })
      .catch((error) => {
        loading.dismiss();

        const errorAlert = this.alertController.create({
          title: 'OMFG! EIN FEHLER!',
          message: error.message,
          buttons: ['Ok']
        });
        errorAlert.present();
      });
  }

}
