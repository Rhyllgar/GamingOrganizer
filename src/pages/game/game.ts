import { GameModel } from './../../models/game-model';
import { ViewController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'page-game',
    templateUrl: 'game.html'
})

export class GamePage {

    ImageArray = [];
    theGame:GameModel;

    maxNumberOfImages: number = 5;


    constructor(private viewCtrl: ViewController, private navParams:NavParams){
        // set game
        this.theGame = navParams.data["theGame"];

        // Set image array
        this.SetImageArray();
    }

    SetImageArray(){
        this.ImageArray = [];
        if(this.theGame.Image1 !== undefined && this.theGame.Image1 != "")
        {
           this.ImageArray.push(this.theGame.Image1);
        }
        if(this.theGame.Image2 !== undefined && this.theGame.Image2 != "")
        {
           this.ImageArray.push(this.theGame.Image2);
        }
        if(this.theGame.Image3 !== undefined && this.theGame.Image3 != "")
        {
           this.ImageArray.push(this.theGame.Image3);
        }
        if(this.theGame.Image4 !== undefined && this.theGame.Image4 != "")
        {
           this.ImageArray.push(this.theGame.Image4);
        }
        if(this.theGame.Image5 !== undefined && this.theGame.Image5 != "")
        {
           this.ImageArray.push(this.theGame.Image5);
        }
    }

    CloseGame() {
        this.viewCtrl.dismiss();
    }
}