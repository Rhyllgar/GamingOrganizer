import { DateModel } from './../../models/date-model';
import { AuthService } from './../../services/auth';
import { GameModel } from './../../models/game-model';
import { GameService } from './../../services/game-service';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class SyncProvider {

    constructor(private gameService: GameService, private storage: Storage, private authService: AuthService) {

    }

    SyncGameData(games: GameModel[]): Promise<any> {

        return new Promise((resolve) => {
            // 0. check authentication
            this.authService.getActiveUser().getToken().then((token: string) => {

            })
                .catch()
            //1. Upload Data
            this.UploadGameData(games);

            // ToDo: Upload nur mit Admin-Rechten und Frage, ob Daten überschrieben werden sollen!

            //2. Download Data
            this.DownloadGameData();
        })
    }

    public UploadGameData(games: GameModel[]): Promise<any> {
        var database = firebase.database();

        return new Promise((resolve) => {
            this.storage.get("MaxGameId").then((data) => {
                firebase.database().ref('single-values').set({
                    MaxGameId: data
                })
            }).then(() => {
                for (let i = 0; i < games.length; i++) {
                    let gameToSave = games[i];
                    firebase.database().ref('games/' + games[i].GameID).set({
                        GameName: gameToSave.GameName,
                        MinimumPlayers: gameToSave.MinimumPlayers,
                        MaximumPlayers: gameToSave.MaximumPlayers,
                        GameType: gameToSave.GameType,
                        MinimumDuration: gameToSave.MinimumDuration,
                        MaximumDuration: gameToSave.MaximumDuration,
                        Owner: gameToSave.Owner,
                        Description: gameToSave.Description,
                        Image1: gameToSave.Image1,
                        Image2: gameToSave.Image2,
                        Image3: gameToSave.Image3,
                        Image4: gameToSave.Image4,
                        Image5: gameToSave.Image5,
                        Deleted: gameToSave.Deleted
                    });
                }
                resolve();
            });
        });
        // get maxGameId 

    }

    DownloadGameData(): Promise<any> {
        return new Promise((resolve) => {
            let allGames: GameModel[] = [];
            let database = firebase.database();
            let maxGameId = 0;
            // get maxGameId so we know how often we have to iterate
            database.ref('single-values/MaxGameId').once('value').then((maxGameIdFromServer) => {
                maxGameId = maxGameIdFromServer.val();

                // now download all game data
                database.ref('games').once('value').then((snapshot) => {
                    let allGamesFromServer = snapshot.val();
                    console.log(allGamesFromServer);
                    this.gameService.ResetMaxGameId().then( async () => {
                        for (let game of allGamesFromServer) {
                            if (game == null) {  // the first entry is empty since gameIds start with 1, so we have to skip it
                                continue;
                            }
                            let newModel: GameModel = this.MapDataToModel(game);
                            await this.gameService.AddGame(newModel);
                        }
                        resolve();
                        // for (let i = 1; i <= maxGameId; i++) {
                        //     let newModel: GameModel = this.MapDataToModel(allGamesFromServer[i]);
                        //     let waitHelper = await this.gameService.AddGame(newModel);
                        // }
                    });

                });
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

    // ---------------------- DATE SYNCHRONISIERUNG -------------------------

    UploadDates(dates: DateModel[]){
        new Promise((resolve) => {
            firebase.database().ref("AllDates").set(dates).then(() => {
                resolve();
            });
        })        
    }

    DownloadDates(): Promise<any>{
        return new Promise((resolve) => {
            firebase.database().ref("AllDates").once('value').then((dates) => {
                if (dates != null)
                {
                this.storage.set("AllDates", dates.val()).then(() => {
                    resolve();
                });
            }
            else
            {
                resolve();
            }
            })
        })
    }

}