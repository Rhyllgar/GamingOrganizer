import { DateScreen } from './../pages/home/date-screen/date-screen';
import { UserProvider } from './../providers/user/user';
import { DatePicker } from '@ionic-native/date-picker';

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
import { DateDialog } from './../pages/home/date-dialog/date-dialog';

import { GameService } from '../services/game-service'
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
    PopoverMenu,
    DateDialog,
    DateScreen
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      // monthNames: ['Januar', '"Februar', 'Maerz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      // monthShortNames: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      // dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag' ],
      // dayShortNames: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa' ]
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule,

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
    PopoverMenu,
    DateDialog,
    DateScreen
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GameService,
    AuthService,
    SQLite,
    DatabaseProvider,
    SyncProvider,
    DatePicker,
    UserProvider
  ]
})
export class AppModule { }
