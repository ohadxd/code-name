import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from './auth/auth.service';
import {GameService} from "./game/game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'codeName';
  roomName: string = this.gameService.roomName
  constructor(private authService: AuthService, private gameService: GameService) {}
  ngOnInit(): void {
    this.authService.autoLogin();
    console.log('app component check');
  }

  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {

    if (this.roomName != 'default')
    this.gameService.deleteRoom(this.gameService.roomName);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {

    if (this.roomName != 'default')
      this.gameService.deleteRoom(this.gameService.roomName);
  }
  ngOnDestroy(): void {
  }

}
