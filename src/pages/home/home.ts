import { SyncProvider } from './../../providers/sync/sync';
import { DatabaseProvider } from './../../providers/database/database';
import { DateModel } from './../../models/date-model';
import { DateDialog } from './date-dialog/date-dialog';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public AllDates: DateModel[] = []

  constructor(public navCtrl: NavController, private modalCtrl:ModalController, private databaseProvider:DatabaseProvider, private syncProvider:SyncProvider) {
    this.LoadDates()
  }

  NewDate(){
    let newDateDialog = this.modalCtrl.create(DateDialog);
    newDateDialog.present();
    newDateDialog.onDidDismiss(() => {
      this.LoadDates();
    });
  }

  LoadDates() {
    this.databaseProvider.LoadAllDates().then((data) => {
      this.AllDates = data;
      console.log(data)
    })
  }

  SyncDates(){
    this.syncProvider.DownloadDates().then(() => {
      this.LoadDates();
    })
  }

  UploadDates(){
    // ToDo: Checken, ob Berechtigung vorhanden ist

    this.syncProvider.UploadDates(this.AllDates);
  }
}



// // Example von: https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { SQLite} from '@ionic-native/sqlite'


// @Component({
//   selector: 'app-root',
//   templateUrl: 'home.html'
// })
// export class HomePage implements OnInit {
//   title = 'app';
//   results = '';
//   constructor(private http: HttpClient){
//   }
//   ngOnInit(): void {
//     this.http.get<UserResponse>
//     ('mysql://U3203586:MySQLm1EiS:2fBmMySQL@keyaira.store.d0m.de:').subscribe(data => {
//       console.log("User Login: " + data.login);
//       console.log("Bio: " + data.bio);
//       console.log("Company: " + data.company);
//     },
//     err => {
//       console.log("Error occured.")
//     }
//   );
//   }
// }

// interface UserResponse {
//   login: string;
//   bio: string;
//   company: string;
// }