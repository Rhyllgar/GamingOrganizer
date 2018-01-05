import { DateModel } from './../../../models/date-model';
import { DatabaseProvider } from './../../../providers/database/database';
import { ModalController, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker';

import { NgForm } from '@angular/forms';
import * as moment from 'moment'


@Component({
    selector: 'page-date-dialog',
    templateUrl: 'date-dialog.html'
})

export class DateDialog {

    private PlayDate: string = new Date().toISOString();
    private PlayTime;
    private PlayLocation: string = "Knoxoleum";

    constructor(private viewCtrl: ViewController, private datePicker: DatePicker, private databaseProvider: DatabaseProvider) {

    }

    Dismiss() {
        this.viewCtrl.dismiss();
    }

    GetTime() {
        console.log("click funzt");
        this.datePicker.show({
            date: new Date(),
            mode: 'time',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
            date => console.log('Got date: ', date),
            err => console.log('Error occurred while getting date: ', err)
            );
    }

    OnSubmit(form: NgForm) {
        if (form != null) {
            let date = new DateModel();
            date.TheDate = form.value.PlayDate;
            date.TheTime = form.value.PlayTime;
            date.TheLocation = form.value.PlayLocation;

            moment.locale("de");
            date.TheDateHtml = moment(date.TheDate).format('LL');
            this.databaseProvider.SaveDate(date).then(() => {
                this.Dismiss();
            })
        }
        else {
            this.Dismiss();
        }
    }

}