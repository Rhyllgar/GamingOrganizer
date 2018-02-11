import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class FileHelperProvider {

    gameImagesFilePath: string = 'GameImages/';
    storageDirectory: string;

    _directoryIsSet = false;
    get DirectoryIsSet() { return this._directoryIsSet; }

    constructor(private platform: Platform, private file: File) {

    }

    SetDirectory() {
        // für ios muss noch ein anderes Verzeichnis gesetzt werden!
        if (this.platform.is('ios')) {
            this.storageDirectory = this.file.documentsDirectory;
        }
        else if (this.platform.is('android')) {
            this.storageDirectory = this.file.externalDataDirectory;
        }

        // prüfen, ob Verzeichnis existiert, wenn nicht: neues Verzeichnis erstellen
        this.file.checkDir(this.storageDirectory, this.gameImagesFilePath)
            .then(() => {
                console.log("passt");
                this._directoryIsSet = true;
            })
            .catch((error) => {
                this.file.createDir(this.storageDirectory, this.gameImagesFilePath, true)
                    .then(() => {
                        console.log("Verzeichnis erfolgreich erstellt");
                        this._directoryIsSet = true;
                    }).catch((error) => {
                        let checker1 = this.storageDirectory;
                        let checker2 = this.gameImagesFilePath;
                        console.log("Fehler - Verzeichnis konnte nicht erstellt werden!");
                        console.log("Fehlermeldung: " + error.message);
                    })
            });

    }

    PlatformIsCordova() {
        return this.platform.is('cordova');
    }

    GetFileUrl(fileName: string):Promise<string> {
        return new Promise((resolve) => {
            this.file.checkDir(this.storageDirectory, this.gameImagesFilePath)
            .then(() => {
                this.file.checkFile(this.storageDirectory, this.gameImagesFilePath + fileName)
                    .then(() => {
                        resolve( this.storageDirectory + this.gameImagesFilePath + fileName);
                    })
                    .catch((error) => {
                        // todo: Toast oder Popup, dass Fehler passiert ist
                        console.log("Beim Laden eines Bildes - das Bild ist vorhanden!");
                        resolve();
                    })
            })
            .catch((error) => {
                // todo: Toast oder Popup, dass Fehler passiert ist
                console.log("Beim Laden eines Bildes - kein Verzeichnis vorhanden!");
                resolve(); 
            })
        });
    
    }
}