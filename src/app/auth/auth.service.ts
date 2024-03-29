import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {UserInfo} from '@firebase/auth';


@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<UserInfo | null>(null);
  userData: UserInfo | null = null;
  isLoading = new Subject<boolean>();
  constructor(private auth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
  }

  login(email: string, password: string) {
    this.isLoading.next(true);
    this.auth.signInWithEmailAndPassword(email, password).then(res  => {
      this.user.next(res.user);
      this.userData = res.user;
      localStorage.setItem('user', JSON.stringify(res.user));
      console.log(res.user);
      this.isLoading.next(false);
      this.router.navigate(['main']);
    }).catch(error => {
      console.log(error);
    })
  }

  logout() {
    this.isLoading.next(true);
    this.auth.signOut().then(() => {
      this.isLoading.next(false);
    })
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(['auth']).then(r => {
    });
  }
  async signup(email: string, password: string, displayName:string, photoUrl: string) {
    this.isLoading.next(true);
    await this.auth.createUserWithEmailAndPassword(email, password).then(
      res => {
        res.user?.updateProfile({displayName: displayName, photoURL: photoUrl}).then((UserInfo)=>{
          this.user.next(res.user);
          this.userData = res.user;
          localStorage.setItem('user', JSON.stringify(res.user));
          if(res.user != null)
            this.db.object('users/'+res.user?.uid).update(res.user).then(res => {
              console.log(res)}
            );
        });

        this.isLoading.next(false);
      }
    ).catch(error => {
      this.isLoading.next(false);
    });
  }

  autoLogin() {
    if(localStorage.getItem('user')){
      const userData = JSON.parse(localStorage.getItem('user') || 'null');
      this.user.next(userData);
      this.userData = userData;
    }
  }

  updateProfile(displayName: string, photoURL: string) {
    this.auth.user.subscribe(user => {
      user?.updateProfile({displayName: 'name', photoURL: 'url'}).then(() => {
        console.log('Update profile succeeded')
      });
      console.log('rock it');
    });
  }

  handleError(error: string) {
  }
}

