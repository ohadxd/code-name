import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {GameService} from "../game.service";

@Component({
  selector: 'app-game-rooms',
  templateUrl: './game-rooms.component.html',
  styleUrls: ['./game-rooms.component.scss']
})
export class GameRoomsComponent implements OnInit {

  listSubscription: Subscription | null = null;
  gameRooms: {name:string, players: number}[] | null = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {

    // Retrieve rooms list from the database threw service
    this.gameService.fetchGameRoomsList();
    this.listSubscription = this.gameService.gamesList.subscribe((list: {name:string, players: number}[]) => {
      for(let key in list)
        this.gameRooms = list
    });
  }

  joinGame(room: string) {
    this.gameService.joinGameRoom(room);
  }
}
