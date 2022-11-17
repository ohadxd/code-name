import { Component, OnInit } from '@angular/core';
import {GameService} from "../game.service";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {

  roomName: string = '';

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  createRoom(name: NgForm) {
    let roomName = name.value.name.toString();
    if(roomName != null) this.gameService.createGameRoom(roomName)
  }
  joinRoom(name) {

  }
}
