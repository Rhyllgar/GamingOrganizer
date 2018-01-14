import { RolesEnumeration, UserModel } from './../../models/user-model';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class UserProvider {

    private activeUser: UserModel;

    SetActiveUser(email: string): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref("Users/").once('value').then((data) => {
                if (data != null) {
                    let allUsers: UserModel[] = data.val();
                    if (allUsers != null) {
                        allUsers.forEach((user) => {
                            if (user.Email == email) {
                                this.activeUser = user;
                                resolve();
                            }
                        })
                    }
                    else {
                        reject(new Error('allUsers war null'));
                    }
                }
            })
        })
    }
    
    HasPermisision(requestedRole: RolesEnumeration): boolean {
        return this.activeUser.Role <= requestedRole;
    }

    GetActiveUser(){
        return this.activeUser;
    }

}