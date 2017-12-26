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

  games: GameModel[] = []

  constructor(public navCtrl: NavController, private modelController: ModalController, private gameService: GameService, public viewCtrl: ViewController) {
    this.LoadGames();
  }

  ionViewWillEnter(){
    this.LoadGames();
  }


  OpenDotMenu(){
    let newGame = this.modelController.create(GamePage, {LoadGamesInParent:this.LoadGames.bind(this)});
    newGame.present();
  }

  LoadGames(){
     this.games = this.gameService.GetGames();
  }
}
