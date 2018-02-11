import { FileHelperProvider } from './../file-helper/file-helper';
import { Platform } from 'ionic-angular';
import { SystemSettingsModel, SystemSettingsProvider } from './../system-settings/system-settings';
import { DateModel } from './../../models/date-model';

import { GameModel } from './../../models/game-model';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


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
    isDesktop: boolean = true;

    gameImagesFilePath: string = 'GameImages/';
    storageDirectory: string;

    constructor(public sqlLite: SQLite, private storage: Storage, private file: File, private platform: Platform, private transfer: FileTransfer, private fileHelper: FileHelperProvider) {
        if (platform.is('cordova')) {
            this.isDesktop = false;
            this.fileHelper.SetDirectory();
        }
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
                    this.SaveGameImages(game).then((gameImageSaved) => {
                        this.allGames.push(game);
                        this.storage.set("games", this.allGames).then(() => {
                            // alle Spiele nochmal laden, damit das Neue auch in der Liste ist
                            this.LoadAllGames().then(() => {
                                resolve();
                            });
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

    SaveGameImages(game: GameModel): Promise<GameModel> {
        return new Promise<GameModel>((resolve) => {

            let directoryToUse = "";
            // wenn wir am Desktop sind, müssen wir nichts tun. 
            if (this.isDesktop) {
                resolve(game);
                //directoryToUse = "file://"
            }
            else {

                // sichergehen, dass Verzeichnis existiert   -- FUNKTIONIERT NICHT, weil asynchron!
                if (!this.fileHelper.DirectoryIsSet) {
                    this.fileHelper.SetDirectory();
                }
                for (let i = 0; i < 5; i++) {
                    // prüfen, ob Bild schon angelegt wurde = ImageName != null UND Image != null
                    if (eval("game.Image" + i) != null && eval("game.Image" + i + "Name") != "")
                        // prüfen, ob Bilddatei auch vorhanden ist
                        {
                        this.file.checkFile(this.file.externalDataDirectory, this.gameImagesFilePath + eval("game.Image" + i + "Name"))
                            .then((result) => {
                                let checker = eval("game.Image" + i + "Name");
                                console.log("Datei existiert");
                            })
                            .catch((error) => {
                                let checker = eval("game.Image" + i + "Name");
                                console.log("Datei existiert nicht");
                                // Bilddatei herunterladen
                                let fileTransfer = this.transfer.create();
                                fileTransfer.download(eval("game.Image" + i), this.file.externalDataDirectory + this.gameImagesFilePath + eval("game.Image" + i + "Name"), true)
                                    .then(() => {
                                        console.log("Download hat geklappt, hurra!");
                                    })
                                    .catch((error) => {
                                        console.log("Download hat nicht geklappt. Fehler: " + error.message);
                                    });
                                // Bildnamen setzen

                            });
                        }
                }
            }

            resolve(game);
        });
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


    // ========================== SYSTEM SETTINGS ==================================

    LoadSystemSettings(): Promise<SystemSettingsModel> {
        return new Promise<SystemSettingsModel>((resolve) => {
            this.storage.get("SystemSettings").then((data) => {
                resolve(data);
            });
        })
    }

    // =========================== FILE TRANSFER ===================================



}