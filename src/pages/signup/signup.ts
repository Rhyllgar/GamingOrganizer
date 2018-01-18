import { SyncProvider } from './../../providers/sync/sync';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { LoadingController, AlertController } from "ionic-angular";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {
  constructor(private authService: AuthService, private loadingController: LoadingController, private alertController: AlertController, private syncProvider: SyncProvider) { }


  onSignup(form: NgForm) {
    const loading = this.loadingController.create({
      content: "Wirst gerade angemeldet..."
    });
    loading.present();
    
    // checken, ob Username schon existiert.
    this.syncProvider.CheckIfUserNameExists(form.value.username).then((userExists) => {
      if (userExists) {
        let userExistsAlert = this.alertController.create({
          title: "Nutzername schon vergeben",
          message: "Dieser Name wird bereits verwendet. Bitte wähle einen anderen Namen",
          buttons: ["Na gut..."]
        });
        userExistsAlert.present();
        loading.dismiss();
      }
      else {
        // neuen User anlegen, erst im Auth mit der Email, dann als User-Datensatz in der Datenbank
        this.authService.signup(form.value.email, form.value.password).then((data) => {
          this.syncProvider.AddNewUser(form.value.email, form.value.username).then(() => {
            // neuen user in Firebase anlegen
            console.log(data);
            loading.dismiss();
            const successAlert = this.alertController.create({
              title: "HURRA!",
              message: 'Es ist vollbracht! Du bist nun bei dieser formdiblen Applikation angemeldet!',
              buttons: ['Super!!!!!!!!1elf']
            })
            successAlert.present();
          });

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

    })
  }

}
