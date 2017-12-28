
import { GameModel } from './../../models/game-model';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DatabaseProvider {

    db: SQLiteObject;
    maxGameId: number;
    allGames: GameModel[] = [];
    gameIdCounter: number = 0;

    constructor(public sqlLite: SQLite, private storage: Storage) {
        this.CheckMaxGameId();
    }

    CheckMaxGameId(): Promise<any> {
        return new Promise((resolve) => {
            this.storage.get("MaxGameId").then((data) => {
                if (data != null) {
                    this.maxGameId = data;
                }
                else {
                    this.maxGameId = 0;
                }
                resolve();
            })
        });
    }

    SaveGame(game: GameModel, isNew: boolean): Promise<any> {
        return new Promise((resolve) => {
            if (isNew) {
                this.CheckMaxGameId().then(() => {
                    this.maxGameId++;
                    this.storage.set("MaxGameId", this.maxGameId).then(() => {
                        this.SaveGameToDatabase(game, this.maxGameId);

                        resolve();
                    });
                })
            }
            else {
                this.LoadAllGames
            }
        })
        this.storage.get("Game" + this.maxGameId).then((data) => { console.log(data) });
    }

    SaveGameToDatabase(game: GameModel, id: number) {

        return this.storage.set("Game" + this.maxGameId, {
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
    async LoadAllGames() {
        // this.storage.get("MaxGameId").then((data) => {
        let allGames: GameModel[] = [];

        for (let i = 1; i <= this.maxGameId; i++) {
            let newModel = await this.LoadGameById(i).then((newGameModel) => {
                if (newGameModel != null) {
                    if (!newGameModel.Deleted) {
                        allGames.push(newGameModel);
                    }
                }
            });

        }
        return allGames;
        // });

    }


    LoadGameById(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.storage.get("Game" + id).then((data) => {
                let game = this.MapDataToModel(data);
                resolve(game);
            }).catch(e => {
                reject(Error("LoadGameByID failed"));
            });
        });

    }

    MapDataToModel(data: any) {
        let newModel = new GameModel();
        if (data != null) {
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
            newModel.Deleted = data.Deleted;
        }
        return newModel;
    }

    ResetMaxGameId(): Promise<any>{
        return new Promise((resolve) => {
            this.maxGameId = 0;
            this.storage.set("MaxGameId", this.maxGameId)
            .then(() => { 
                resolve();
            });
        })
    }
}