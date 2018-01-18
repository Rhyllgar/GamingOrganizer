import { DatabaseProvider } from './../providers/database/database';
import { GameModel } from './../models/game-model';
import { Injectable } from '@angular/core';

@Injectable()

export class GameService {
    constructor(private database: DatabaseProvider) {

    }
    private games: GameModel[] = [];

    public AddGame(game: GameModel) :Promise<any>{
        return new Promise((resolve) => {
            this.database.SaveGame(game, true).then(() => {
                resolve();
            }).catch((e) => {
                console.log(e.message) 
            });
        })        
    }

    EditGame(game: GameModel) {
        this.database.SaveGame(game, false);
    }
    
    DeleteGame(game: GameModel) {
        console.log("Löschen ---- Vorher: " + this.games);
        let deleteIndex = this.games.indexOf(game);
        this.games.splice(deleteIndex, 1);
        console.log("Nachher: " + this.games);
    }

    GetGames(): Promise<any> {
        return new Promise((resolve) => {
            // slice: ohne Argumente übergibt eseine Kopie des Arrays
            this.database.LoadAllGames().then((allGames) => {
                var checker = allGames;
                resolve(allGames);
            });
        })
    }

    // ResetMaxGameId(): Promise<any>{
    //     return new Promise((resolve) => {
    //         this.database.ResetMaxGameId().then(() => { 
    //             resolve();
    //         });
    //     })
    // }

    
  EmptyLocalGameData(){
    this.database.EmptyLocalGameData();
  }

}