import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {fromEvent, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  componentToShow = 'chat';
  mobile = false;

  ngOnInit(): void {
    // Responsive Page: Check Device size for adjusting
    if (window.innerWidth <= 800) {
      this.mobile = true
    } else {
      this.mobile = false
    }
  }
  constructor() { }

  // Responsive Page: Check if device resized for adjusting
  checkScreenSize() {
    if (innerWidth <= 800) {
      this.mobile = true
    } else {
      this.mobile = false
    }
  }
  switchDisplayedComponent(componentToShow: string) {
    this.componentToShow = componentToShow;
  }

}

