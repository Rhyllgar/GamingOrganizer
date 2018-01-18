import { UserProvider } from './../../../providers/user/user';
import { SyncProvider } from './../../../providers/sync/sync';
import { DateModel } from './../../../models/date-model';
import { UserModel } from './../../../models/user-model';
import { GameModel } from './../../../models/game-model';
import { NavParams, NavController, ViewController } from 'ionic-angular';

import { Component } from '@angular/core';

@Component({
    selector: 'page-date-screen',
    templateUrl: 'date-screen.html'
})

export class DateScreen {

    private theDate: DateModel;

    private playersHtml: string;
    private user: string;

    // private playLocation: string = "";
    // private playDate: string = "";
    // private playTime: string = "";
    // private playGames: GameModel[] = [];
    // private Players: string[] = [];
    // private playersHtml: string = "";

    private participates: boolean = false;

    constructor(private viewCtrl: ViewController, private navParams: NavParams, private syncProvider: SyncProvider, private userProvider: UserProvider) {
        // let theDate: DateModel = navParams.data;
        this.theDate = navParams.data.date;
        // this.playDate = theDate.TheDate;
        // this.playLocation = theDate.TheLocation;
        // this.playTime = theDate.TheTime;
        // this.playGames = theDate.TheGames;
        // this.Players = theDate.ThePlayers;

        this.user = this.userProvider.GetActiveUser().Name;
        this.participates = this.PlayerParticipates();
        this.SetPlayersString();
    }

    Close() {
        this.viewCtrl.dismiss();
    }

    SetPlayersString() {
        if (this.theDate.ThePlayers === undefined || this.theDate.ThePlayers.length == 0) {
            this.playersHtml = "Noch kommt keiner. Oder sie kommen, ohne sich anzumelden. Ts, ts, ts...";
        }
        else {
            let playersString: string = this.theDate.ThePlayers[0];
            for (let i = 1; i < this.theDate.ThePlayers.length; i++) {
                playersString = playersString.concat(', ', this.theDate.ThePlayers[i]);
            }
            this.playersHtml = playersString;
        }
    }

    CloseScreen() {
        // Teilnahme speichern hier oder direct bei Participate
        this.Dismiss();
    }

    Dismiss() {
        this.viewCtrl.dismiss();
    }

    Participate() {
        this.participates = !this.participates;
        this.syncProvider.UpdateDate(this.theDate, this.user, this.participates);
        // TODO: Die View aktualisieren, nachdem teilgenommen oder abgesagt     //.then(() => this.SetPlayersString())
    }

    PlayerParticipates(): boolean {
        let isParticipating:boolean;
        if (this.theDate.ThePlayers === undefined || this.theDate.ThePlayers.length == 0) {
            isParticipating = false;
        }
        else{
            this.theDate.ThePlayers.forEach((player) => {
                if (player == this.user) {
                    isParticipating = true;
                }
            })
        }
        return isParticipating;
    }
}