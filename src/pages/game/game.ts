import { FileHelperProvider } from './../../providers/file-helper/file-helper';
import { GameModel } from './../../models/game-model';
import { ViewController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'page-game',
    templateUrl: 'game.html'
})

export class GamePage {

    ImageArray = [];
    theGame: GameModel;

    maxNumberOfImages: number = 5;


    constructor(private viewCtrl: ViewController, private navParams: NavParams, private fileHelper: FileHelperProvider) {
        // set game
        this.theGame = navParams.data["theGame"];

        // Set image array
        this.SetImageArray();
    }

    async SetImageArray() {
        this.ImageArray = [];

        if (this.fileHelper.PlatformIsCordova()) {
            for (let i = 0; i < 5; i++)  // load images | maximages
            {
                if (eval("this.theGame.Image" + i + "Name !== undefined && this.theGame.Image" + i + "Name != \"\"")) {
                    this.fileHelper.GetFileUrl(eval("this.theGame.Image" + i + "Name")).then((result) => {
                        this.ImageArray.push(result);
                    });                    
                }
            }
        }
        else {
            if (this.theGame.Image1 !== undefined && this.theGame.Image1 != "") {
                this.ImageArray.push(this.theGame.Image1);
            }
            if (this.theGame.Image2 !== undefined && this.theGame.Image2 != "") {
                this.ImageArray.push(this.theGame.Image2);
            }
            if (this.theGame.Image3 !== undefined && this.theGame.Image3 != "") {
                this.ImageArray.push(this.theGame.Image3);
            }
            if (this.theGame.Image4 !== undefined && this.theGame.Image4 != "") {
                this.ImageArray.push(this.theGame.Image4);
            }
            if (this.theGame.Image5 !== undefined && this.theGame.Image5 != "") {
                this.ImageArray.push(this.theGame.Image5);
            }
        }
    }

    CloseGame() {
        this.viewCtrl.dismiss();
    }
}