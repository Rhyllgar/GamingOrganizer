import { DateModel } from './../../models/date-model';

import { GameModel } from './../../models/game-model';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
    Kurzer Überblick:
    - Spiele werden relativ kompliziert geholt: MaxGameId => alle Spiele einzeln holen
    - Termine (dates) werden leichter geholt: Ein AllDates[]-Array, das als einziges Objekt gespeichert wird. 
*/


@Injectable()
export class DatabaseProvider {

    db: SQLiteObject;
    maxGameId: number;
    allGames: GameModel[] = [];
    gameIdCounter: number = 0;
    allDates: DateModel[] = [];

    constructor(public sqlLite: SQLite, private storage: Storage) {
        // this.CheckMaxGameId();
    }

    // ========================== Spiele-Daten =============================


    EmptyLocalGameData() {
        this.allGames = [];
    }

    SaveGame(game: GameModel, newGame: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            if (game != null) {
                if (newGame) {
                    game.GameID = this.allGames.length;
                    this.allGames.push(game);
                    this.storage.set("games", this.allGames).then(() => {
                        // alle Spiele nochmal laden, damit das Neue auch in der Liste ist
                        this.LoadAllGames().then(() => {
                            resolve();
                        });

                    });
                }
                else {
                    // TODO - Code fürs Editieren einfügen: Spiel aus allen spielen suchen, Eintrag ändern, alle spiele speichern
                }
            }
            else {
                reject(new Error('no game was given to save'));
            }
        })
    }

    LoadAllGames(): Promise<any> {
        return new Promise((resolve) => {
            this.storage.get("games").then((data) => {
                if (data != null) {
                    this.allGames = data;
                    resolve(this.allGames);
                }
            })
        })
    }




    // CheckMaxGameId(): Promise<any> {
    //     return new Promise((resolve) => {
    //         this.storage.get("MaxGameId").then((data) => {
    //             if (data != null) {
    //                 this.maxGameId = data;
    //             }
    //             else {
    //                 this.maxGameId = 0;
    //             }
    //             resolve();
    //         })
    //     });
    // }

    // SaveGame(game: GameModel, isNew: boolean): Promise<any> {
    //     return new Promise((resolve) => {
    //         if (isNew) {
    //             this.CheckMaxGameId().then(() => {
    //                 this.maxGameId++;
    //                 this.storage.set("MaxGameId", this.maxGameId).then(() => {
    //                     this.SaveGameToDatabase(game, this.maxGameId);

    //                     resolve();
    //                 });
    //             })
    //         }
    //         else {
    //             this.LoadAllGames
    //         }
    //     })
    //     // this.storage.get("Game" + this.maxGameId).then((data) => { console.log(data) });
    // }

    // SaveGameToDatabase(game: GameModel, id: number) {

    //     return this.storage.set("Game" + this.maxGameId, {
    //         GameID: this.maxGameId,
    //         GameName: game.GameName,
    //         MinimumPlayers: game.MinimumPlayers,
    //         MaximumPlayers: game.MaximumPlayers,
    //         GameType: game.GameType,
    //         MinimumDuration: game.MinimumDuration,
    //         MaximumDuration: game.MaximumDuration,
    //         Owner: game.Owner,
    //         Description: game.Description,
    //         Image1: game.Image1,
    //         Image2: game.Image2,
    //         Image3: game.Image3,
    //         Image4: game.Image4,
    //         Image5: game.Image5,
    //         Deleted: game.Deleted
    //     });
    // }
    // async LoadAllGames() {
    //     // this.storage.get("MaxGameId").then((data) => {
    //     let allGames: GameModel[] = [];

    //     for (let i = 1; i <= this.maxGameId; i++) {
    //         let newModel = await this.LoadGameById(i).then((newGameModel) => {
    //             if (newGameModel != null) {
    //                 if (!newGameModel.Deleted) {
    //                     allGames.push(newGameModel);
    //                 }
    //             }
    //         });

    //     }
    //     return allGames;
    //     // });

    // }

    // LoadGameById(id: number): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.storage.get("Game" + id).then((data) => {
    //             let game = this.MapDataToModel(data);
    //             resolve(game);
    //         }).catch(e => {
    //             reject(Error("LoadGameByID failed"));
    //         });
    //     });

    // }

    // MapDataToModel(data: any) {
    //     let newModel = new GameModel();
    //     if (data != null) {
    //         newModel.GameID = data.GameID;
    //         newModel.GameName = data.GameName;
    //         newModel.MinimumPlayers = data.MinimumPlayers;
    //         newModel.MaximumPlayers = data.MaximumPlayers;
    //         newModel.GameType = data.GameType;
    //         newModel.MinimumDuration = data.MinimumDuration;
    //         newModel.MaximumDuration = data.MaximumDuration;
    //         newModel.Owner = data.Owner;
    //         newModel.Image1 = data.Image1;
    //         newModel.Image2 = data.Image2;
    //         newModel.Image3 = data.Image3;
    //         newModel.Image4 = data.Image4;
    //         newModel.Image5 = data.Image5;
    //         newModel.Description = data.Description;
    //         newModel.Deleted = data.Deleted;
    //     }
    //     return newModel;
    // }

    // ResetMaxGameId(): Promise<any> {
    //     return new Promise((resolve) => {
    //         this.maxGameId = 0;
    //         this.storage.set("MaxGameId", this.maxGameId)
    //             .then(() => {
    //                 resolve();
    //             });
    //     })
    // }


    // ============================== Termin-Daten ===================================

    // TO DO:
    // Checken, ob Termine abgelaufen sind, und wenn ja: aus dem Storage löschen
    // ACHTUNG: serverseitig darf das nur 1 x passieren, das dürfen die Clients nicht machen!
    // Alternative: Alle Dates werden synchronisiert, aber der Client sortiert, welche angezeigt werden
    // Vorteil davon: vergangene Dates können noch angesehen werden, z. B. um zu sehen, welche Spiele gespielt wurden

    SaveDate(date: DateModel): Promise<any> {
        return new Promise((resolve, reject) => {
            if (date != null) {
                date.DateId = this.allDates.length;
                this.allDates.push(date);
                this.storage.set("AllDates", this.allDates).then(() => {
                    resolve();
                });
            }
            else {
                reject();
            }
        })
    }

    LoadAllDates(): Promise<any> {
        return new Promise((resolve) => {
            this.storage.get("AllDates").then((data) => {
                if (data != null) {
                    let sortedDates: DateModel[] = data;
                    sortedDates.sort(function (a, b) {
                        let firstDate = +new Date(a.TheDate + ":" + a.TheTime);
                        let secondDate = +new Date(b.TheDate + ":" + b.TheTime);
                        return firstDate - secondDate;
                    })
                    this.allDates = data as DateModel[];
                    let checker = this.allDates[0].TheDateHtml;
                    resolve(this.allDates);
                }
            });
        })
    }

}