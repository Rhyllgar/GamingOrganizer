
import { GameModel } from './../../models/game-model';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DatabaseProvider {

    db: SQLiteObject;
    maxGameId: number = 0;

    constructor(public sqlLite: SQLite, private storage: Storage) {
        // this.InitializeDatabase();
    }


    /*
        Storage / JSON-Objekt - wie machen?
        
    */

    SaveGame(game: GameModel, isNew: boolean) {
        if (isNew) {
            this.storage.get("MaxGameId").then((data) => {
                this.maxGameId = data + 1;
                this.storage.set("MaxGameId", this.maxGameId).then(() => {
                    this.SaveGameToDatabase(game, this.maxGameId);
                });
            })
        }
        else {
            this.LoadAllGames
        }

        this.storage.get("Game" + this.maxGameId).then((data) => { console.log(data) });
    }

    SaveGameToDatabase(game: GameModel, id: number) {

        this.storage.set("Game" + this.maxGameId, {
            GameID: this.maxGameId,
            GameName: game.GameName,
            MinimumPlayers: game.MinimumPlayers,
            MaximumPlayers: game.MaximumPlayers,
            GameType: game.GameType,
            MinimumDuration: game.MinimumDuration,
            MaximumDuration: game.MaximumDuration,
            Owner: game.Owner,
            Description: game.Description,
            Image1: game.Image1,
            Image2: game.Image2,
            Image3: game.Image3,
            Image4: game.Image4,
            Image5: game.Image5,
            Deleted: game.Deleted
        });
    }
    LoadAllGames() {
        this.storage.get("MaxGameId").then((data) => {
            if (data != null) {
                this.maxGameId = data;
            }
            let allGames: GameModel[] = [];
            for (let i = 0; i < this.maxGameId; i++) {
                let newModel = this.LoadGameById(i);
                if (newModel != null) {
                    if (!newModel.Deleted)
                    {
                        allGames.push(newModel);
                    }
                }
            }
            return allGames;
        });

    }

    LoadGameById(id: number): any {
        this.storage.get("Game" + id).then((data) => {
            if (data.Deleted) {
                return null;
            }
            else {
                return this.MapDataToModel(data);
            }
        }).catch(e => { console.log(e) });
    }

    MapDataToModel(data: any) {
        let newModel = new GameModel();
        newModel.GameID = data.GameID;
        newModel.GameName = data.GameName;
        newModel.MinimumPlayers = data.MinimumPlayers;
        newModel.MaximumPlayers = data.MaximumPlayers;
        newModel.GameType = data.GameType;
        newModel.MinimumDuration = data.MinimumDuration;
        newModel.MaximumDuration = data.MaximumDuration;
        newModel.Owner = data.Owner;
        newModel.Image1 = data.Image1;
        newModel.Image2 = data.Image2;
        newModel.Image3 = data.Image3;
        newModel.Image4 = data.Image4;
        newModel.Image5 = data.Image5;
        newModel.Description = data.Description;
        if (data.deleted)
        { newModel.Deleted = data.Deleted; }

        return newModel;
    }

    // InitializeDatabase() {
    //     this.sqlLite.create({
    //         name: 'GamingOrganizer.db',
    //         location: 'default'
    //     }).then((db: SQLiteObject) => {
    //         this.db = db;
    //         // Datenbank anlegen
    //         db.executeSql('CREATE TABLE IF NOT EXISTS Games(GameId INTEGER PRIMARY KEY AUTOINCREMENT, GameName, MinimumPlayers, MaximumPlayers, GameType, MinimumDuration, MaximumDuration, Owner, Description, Image1, Image2, Image3, Image4, Image5', {})
    //             .then(() => { console.log("Datenbank angelegt") })
    //             .catch(e => console.log(e))
    //     });
    // }

    // SaveGame(game: GameModel) {
    //     if (this.db == null) {
    //         this.InitializeDatabase();          // ToDo: wird Fehler geben, weil asynchron
    //     }

    //     this.db.executeSql(`INSERT INTO Games(
    //         GameName, MinimumPlayers, MaximumPlayers, GameType, MinimumDuration, MaximumDuration, Owner, Description, Image1, Image2, Image3, Image4, Image5) 
    //         VALUES(` + game.GameName + `,`
    //         + game.MinimumPlayers + `,`
    //         + game.MaximumPlayers + `,`
    //         + game.GameType + `,`
    //         + game.MinimumDuration + `,`
    //         + game.MaximumDuration + `,`
    //         + game.Owner + `,`
    //         + game.Description + `,`
    //         + game.Image1 + `,`
    //         + game.Image2 + `,`
    //         + game.Image3 + `,`
    //         + game.Image4 + `,`
    //         + game.Image5 + `)`, {})
    // }

    // LoadAllGames() {

    //     let items: GameModel[] = [];

    //     this.sqlLite.create({
    //         name: 'GamingOrganizer.db',
    //         location: 'default'
    //     }).then((db: SQLiteObject) => {
    //         db.executeSql(`SELECT * FROM Games ORDER BY GameName`, {})
    //         .then((data) => {

    //             if (data.rows.length > 0) {
    //                 for (let i = 0; i < data.rows.length; i++) {
    //                     items.push(new GameModel(
    //                         data.rows.items(i).GameID,
    //                         data.rows.item(i).GameName,
    //                         data.rows.item(i).MinimumPlayers,
    //                         data.rows.item(i).MaximumPlayers,
    //                         data.rows.item(i).GameType,
    //                         data.rows.item(i).MinimumDuration,
    //                         data.rows.item(i).MaximumDuration,
    //                         data.rows.item(i).Owner,
    //                         data.rows.item(i).Image1,
    //                         data.rows.item(i).Image2,
    //                         data.rows.item(i).Image3,
    //                         data.rows.item(i).Image4,
    //                         data.rows.item(i).Image5,
    //                         data.rows.item(i).Description)
    //                     )
    //                 }
    //             }
    //         }).catch(e => { console.log(e) });
    //     }).catch(e => { console.log(e) });
    //     return items;
    // }
}