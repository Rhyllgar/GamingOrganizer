import { UserProvider } from './../providers/user/user';
import { AuthService } from './../services/auth';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ListPage } from '../pages/list/list';
import { SchedulingPage } from '../pages/scheduling/scheduling';
import { GameListPage } from '../pages/gamelist/gamelist';
import { GamePage } from '../pages/game/game';
import { PlayerProfilePage } from '../pages/playerprofile/playerprofile';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SigninPage;
  tabsPage: any = TabsPage;
  signinPage: any = SigninPage
  pages: Array<{ title: string, component: any, signin: boolean }>;
  isAuthenticated = false;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private authService: AuthService, private userProvider: UserProvider  ) {
    firebase.initializeApp({
      apiKey: "AIzaSyDphkCcTArygVPZAoWpmgH8-oeA0engUv4",
      authDomain: "gamingorganizer-53efc.firebaseapp.com",
      databaseURL: "https://gamingorganizer-53efc.firebaseio.com",
      projectId: "gamingorganizer-53efc",
      storageBucket: "gamingorganizer-53efc.appspot.com"
    });

    this.initializeApp();
    // used for an example of ngFor and navigation -- sidemenu
    this.pages = [
      { title: 'Dashboard', component: HomePage, signin: false },  // 0
      { title: 'List', component: ListPage, signin: false },
      { title: 'Terminfindung', component: SchedulingPage, signin: false },
      { title: 'Spieleliste', component: GameListPage, signin: false },
      { title: 'Profil', component: PlayerProfilePage, signin: false },
      { title: 'Login', component: SigninPage, signin: true }, // 5
      { title: 'Registrieren', component: SignupPage, signin: true }
    ];

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.userProvider.SetActiveUser(user.email).then(() => {
          this.nav.setRoot(this.tabsPage);
        }).catch((e) => {
          console.log(e.message)
        });
        
      }
      else {
        this.isAuthenticated = false;
        this.nav.setRoot(this.signinPage);
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  onLogout() {
    this.authService.logOut();
  }
}
