import { GameService } from './../../services/game-service';
import { GameModel } from './../../models/game-model';
import { NgForm } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';



@Component({
    selector: 'page-add-game',
    templateUrl: 'add-game.html'
})

export class AddGamePage {

    wasChanged: boolean = true;
    tabTitle: string = "Neues Spiel";
    gameType: any = "vs";
    LoadGamesInParent: any;
    GameType: string = "Versus";

    constructor(public navControl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private alertCtrl: AlertController, private gameService: GameService) {
        
        this.LoadGamesInParent = this.navParams.get("LoadGamesInParent");
        // TODO: Parameter = geöffnetes Spiel => wenn == null, neues Spiel, sonstn Spiel öffnen

        // TODO 2: je nach neu/geöffnet Titel "Neues Spiel" oder "Spiel bearbeiten"
    }


    CloseGame() {

        // if (this.wasChanged) {
        //     let yesNoDialog = this.alertCtrl.create({
        //         title: 'Vorm Schließen speichern?',
        //         message: 'Änderungen wurden noch nicht gespeichert. Jetzt speichern?',
        //         buttons: [{
        //             text: "Jo, mach mal",
        //             handler: () => {
        //                 this.SaveGame(null);
        //             }
        //         },
        //         {
        //             text: 'Nee, lass ma',
        //             handler: () => {
        //                 this.viewCtrl.dismiss();
        //             }
        //         },
        //         {
        //             text: 'Abbrechen',
        //             handler: () => { return; }
        //         }]
        //     });
        //     yesNoDialog.present();
        // }
        // else {
        //     this.viewCtrl.dismiss();
        // }

        this.viewCtrl.dismiss();
    }

    OnSubmit(form: NgForm) {
        console.log(form.value);
        this.SaveGame(form);
    }

    SaveGame(form: NgForm) {
        if (form == null) {
            // TODO: Daten aus der Form holen, sodass sie gespeichert werden!
            console.log("Spiel sollte gespeichert werden");
        }
        else {
            let gameModel = new GameModel()
            gameModel.GameID = 0; 
            gameModel.GameName = form.value.GameName; 
            gameModel.MinimumPlayers = form.value.MinimumPlayers; 
            gameModel.MaximumPlayers = form.value.MaximumPlayers; 
            gameModel.GameType = form.value.GameType; 
            gameModel.MinimumDuration = form.value.MinimumDuration; 
            gameModel.MaximumDuration = form.value.MaximumDuration; 
            gameModel.Owner = form.value.Owner; 
            gameModel.Image1 = form.value.Image1; 
            gameModel.Image2 = form.value.Image2;
            gameModel.Image3 = form.value.Image3; 
            gameModel.Image4 = form.value.Image4; 
            gameModel.Image5 = form.value.Image5; 
            gameModel.Description = form.value.Description;
            gameModel.Deleted = false;
            this.gameService.AddGame(gameModel);            
        }
        this.LoadGamesInParent();
        form.reset();

        // TODO: Wenn auf DB gespeichert => Berechtigungen abfragen!


    }


}