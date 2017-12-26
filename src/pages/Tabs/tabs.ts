import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { GameListPage } from '../gamelist/gamelist';
import { PlayerProfilePage } from '../playerprofile/playerprofile';

@Component ({ 
    selector: 'page-tabs',
    template: `<ion-tabs>
    <ion-tab [root]="homePage" tabTitle="Dashboard" tabIcon="book"></ion-tab>
    <ion-tab tabIcon="compass" [root]="gameListPage"></ion-tab>
    <ion-tab tabIcon="analytics" [root]="playerProfilePage"></ion-tab>
  </ion-tabs>`    
})

export class TabsPage { 
    homePage = HomePage;
    gameListPage = GameListPage;
    playerProfilePage = PlayerProfilePage;
}