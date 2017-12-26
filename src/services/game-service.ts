import { DatabaseProvider } from './../providers/database/database';
import { GameModel } from './../models/game-model';
import { Injectable } from '@angular/core';

@Injectable()

export class GameService {
    constructor (private database:DatabaseProvider){

    }
    private games: GameModel[] = [];

    AddGame(game: GameModel)
    {
        // console.log("Addieren ---- Vorher: " + this.games);
        // console.log(this.games);
        // this.games.push(game);
        // console.log("Nachher: " + this.games);

        this.database.SaveGame(game, true);
    }

    EditGame(game: GameModel)
    {
        this.database.SaveGame(game, false);
    }
    DeleteGame(game: GameModel){
        console.log("Löschen ---- Vorher: " + this.games);
        let deleteIndex = this.games.indexOf(game);
        this.games.splice(deleteIndex, 1);
        console.log("Nachher: " + this.games);
    }

    GetGames(){
        // slice: ohne Argumente übergibt eseine Kopie des Arrays
        let checker =  this.database.LoadAllGames();
        return checker;
    }
}