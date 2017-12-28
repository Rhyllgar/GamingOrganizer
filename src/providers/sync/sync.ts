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

    SyncGameData(games: GameModel[]) {
        // 0. check authentication
        this.authService.getActiveUser().getToken().then((token: string) => {

        })
            .catch()
        //1. Upload Data
        this.UploadGameData(games);


        // ToDo: Upload nur mit Admin-Rechten und Frage, ob Daten überschrieben werden sollen!

        //2. Download Data
        this.DownloadGameData();
    }

    UploadGameData(games: GameModel[]): Promise<any> {
        var database = firebase.database();

        return new Promise((resolve) => {
            this.storage.get("MaxGameId").then((data) => {
                firebase.database().ref('games/MaxGameId').set({
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

    async DownloadGameData() {
        let allGames: GameModel[] = [];
        let database = firebase.database();
        let maxGameId = 0;
        // get maxGameId so we know how often we have to iterate
        database.ref('games/MaxGamesId').once('value').then((maxGameIdFromServer) => {
            maxGameId = maxGameIdFromServer;

            // now download all game data
            for (let i = 0; i < maxGameId; i++) {
                let newModel = await this.GetSingleGameById(i).then((newGameModel) => {
                    if (newGameModel != null) {
                        if (!newGameModel.Deleted) {
                            allGames.push(newGameModel);
                        }
                    }
                });
            }
        });
    }



    GetSingleGameById(id: number): Promise<any> {
        return new Promise((resolve) => {
            firebase.database().ref('games/' + id).once('value').then((data) => {
                let game = this.MapDataToModel(data);
                resolve(game);
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


    }