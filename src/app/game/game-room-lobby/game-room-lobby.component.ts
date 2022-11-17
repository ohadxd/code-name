import { Component, OnInit } from '@angular/core';
import {GameService} from "../game.service";
import {ActivatedRoute, RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'app-game-room-lobby',
  templateUrl: './game-room-lobby.component.html',
  styleUrls: ['./game-room-lobby.component.scss']
})
export class GameRoomLobbyComponent implements OnInit {
  room: string = '';
  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameService.roomName = this.route.snapshot.params['room'];
  }
  chooseRole(role: string) {
    this.gameService.takeRole(role);
  }
}
