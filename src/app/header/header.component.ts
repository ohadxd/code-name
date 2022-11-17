import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth = false;
  profileImg = "";
  authSubscription: Subscription | null = null;
  mobile = false;
  sidenavOpen = false;

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe(user => {
      this.isAuth = !!user;
      if (user != null)
      this.profileImg = user.photoURL;
      console.log(this.profileImg);
    })
    // Responsive Page: Check Device size for adjusting
    if (window.innerWidth <= 800) {
      this.mobile = true
    } else {
      this.mobile = false
    }

  }
logout() {
this.authService.logout();
}
  defaultProfileImg() {
    this.profileImg = "assets/profile.jpg"
  }

  checkScreenSize() {
    if (innerWidth <= 800) {
      this.mobile = true
    } else {
      this.mobile = false
    }
  }

  openSideNav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
