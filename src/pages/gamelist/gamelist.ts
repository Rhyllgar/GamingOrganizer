import { FileHelperProvider } from './../../providers/file-helper/file-helper';
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
    private userProvider: UserProvider, private fileHelper: FileHelperProvider) {
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

      if (this.fileHelper.PlatformIsCordova()) {
        // set title image according to cordova or browser
        this.AllGames.forEach((game) => {
          this.GetGameImageFile(game.Image1Name).then((fileUrl) => {
            game.Image1ImageUrl = fileUrl;
          })
        });
      }
    });
  }

  OpenGame(game: GameModel) {
    let openedGame = this.modalController.create(GamePage, { theGame: game });
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

  GetGameImageFile(fileName: string): Promise<string> {
    return new Promise((resolve) => {
      this.fileHelper.GetFileUrl(fileName).then((fileUrl) => {
        resolve(fileUrl);
      })
        .catch((error) => {
          console.log("Fehler: GetGameImageFile in gamelist.ts - filename konnte nicht geladen werden");
        });
    });
  }

  HasPermissionToAddGame() {
    return this.userProvider.HasPermisision(RolesEnumeration.ADDGAMES);
  }

  PlatformIsCordova() {
    return this.fileHelper.PlatformIsCordova();
  }

  // TODO: a) Woanders hintun und b) Bildschirm geht auf und man kann Dinge einstellen
}
