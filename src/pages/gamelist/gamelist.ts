import { SyncProvider } from './../../providers/sync/sync';
import { GameModel } from './../../models/game-model';
import { GameService } from './../../services/game-service';
import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController, ViewController } from 'ionic-angular';
import {GamePage} from '../game/game'

@Component({
  selector: 'page-gamelist',
  templateUrl: 'gamelist.html'
})
export class GameListPage {

  AllGames: GameModel[] = []

  constructor(public navCtrl: NavController, private modelController: ModalController, private gameService: GameService, public viewCtrl: ViewController, private syncProvider: SyncProvider) {
    //this.LoadGames();
  }

  ionViewWillEnter(){
    this.LoadGames();
  }


  AddGame(){
    let newGame = this.modelController.create(GamePage, {LoadGamesInParent:this.LoadGames.bind(this)});
    newGame.present();
  }

  LoadGames(){
     this.gameService.GetGames().then((games) => { 
       this.AllGames = games;
     });
  }

  OpenGame(game:GameModel){
    console.log(game);
  }

  UploadGameData(){
    this.syncProvider.UploadGameData(this.AllGames);
  }
  
    
    DownloadGameData(){
      this.syncProvider.DownloadGameData().then(() => {
        this.LoadGames();
      });

    // TODO: a) Woanders hintun und b) Bildschirm geht auf und man kann Dinge einstellen
  }
}
