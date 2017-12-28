
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { GameListPage } from '../pages/gamelist/gamelist';
import { GamePage } from '../pages/game/game';
import { ListPage } from '../pages/list/list';
import { PlayerProfilePage } from '../pages/playerprofile/playerprofile';
import { SchedulingPage } from '../pages/scheduling/scheduling';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { PopoverMenu } from '../components/popover-menu/popover-menu';

import { GameService} from '../services/game-service'
import { AuthService } from '../services/auth';
import { HttpClientModule } from '@angular/common/http'

import { IonicStorageModule } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../providers/database/database';
import { SyncProvider } from './../providers/sync/sync';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    ListPage,
    GameListPage,
    PlayerProfilePage,
    SchedulingPage,
    SignupPage,
    SigninPage,
    GamePage,
    PopoverMenu
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    ListPage,
    GameListPage,
    PlayerProfilePage,
    SchedulingPage,
    SignupPage,
    SigninPage,
    GamePage,
    PopoverMenu
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GameService,
    AuthService,
    SQLite,
    DatabaseProvider, 
    SyncProvider
  ]
})
export class AppModule {}
