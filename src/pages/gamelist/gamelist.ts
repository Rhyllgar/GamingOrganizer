import { RolesEnumeration } from './../../models/user-model';
import { UserProvider } from './../../providers/user/user';
import { SyncProvider } from './../../providers/sync/sync';
import { GameModel } from './../../models/game-model';
import { GameService } from './../../services/game-service';
import { Component } from '@angular/core';
import { NavController, PopoverController, ModalController, ViewController } from 'ionic-angular';
import { GamePage } from '../game/game';
import { AddGamePage } from '../add-game/add-game'

@Component({
  selector: 'page-gamelist',
  templateUrl: 'gamelist.html'
})
export class GameListPage {

  AllGames: GameModel[] = []
//  HasPermissionToAddGame: boolean = false;

  constructor(public navCtrl: NavController, private modalController: ModalController, private gameService: GameService, public viewCtrl: ViewController, private syncProvider: SyncProvider,
  private userProvider:UserProvider) {
    //this.LoadGames();
   // this.HasPermissionToAddGame = this.userProvider.HasPermisision(RolesEnumeration.ADDGAMES);
  }

  ionViewWillEnter() {
    this.LoadGames();
  }


  AddGame() {
    let newGame = this.modalController.create(AddGamePage, { LoadGamesInParent: this.LoadGames.bind(this) });
    newGame.present();
  }

  LoadGames() {
    this.gameService.GetGames().then((games) => {
      this.AllGames = games;
    });
  }

  OpenGame(game: GameModel) {
    let openedGame = this.modalController.create(GamePage, { theGame: game});
    openedGame.present();
    console.log(game);
  }

  UploadGameData() {
    this.syncProvider.UploadGameData(this.AllGames);
  }


  DownloadGameData() {
    this.syncProvider.DownloadGameData().then(() => {
      this.LoadGames();
    });
 
  }

  HasPermissionToAddGame() 
  { 
    return this.userProvider.HasPermisision(RolesEnumeration.ADDGAMES);
  }


     // TODO: a) Woanders hintun und b) Bildschirm geht auf und man kann Dinge einstellen
}
