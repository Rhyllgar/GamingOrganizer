import { DatabaseProvider } from './../database/database';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()

export class SystemSettingsProvider{

    public systemSettings: SystemSettingsModel;

    public isMobile: boolean = false;

    constructor(private database:DatabaseProvider, private platform:Platform)
    {
        this.database.LoadSystemSettings().then((result) => {

            if (!platform.is('core'))
            {
                this.isMobile = true;
            }

            if (result != null)
            {
                this.systemSettings = result;
            }
            else 
            {
                this.systemSettings = new SystemSettingsModel();
            }
        });
    }
}

export class SystemSettingsModel{
    public DownloadImages2through5: boolean = false;
    public DownloadTitleImage: boolean = false;
    public DownloadGames: boolean = false;
    public DownloadDates: boolean = true;
}