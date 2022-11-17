import { Component, OnInit } from '@angular/core';
import {GameService} from "./game.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  //temporary placeholder

  cards: String[] = ['loading', 'loading', 'loading', 'loading', 'loading',
    'loading', 'loading', 'loading', 'loading', 'loading',
    'loading', 'loading', 'loading', 'loading', 'loading',
    'loading', 'loading', 'loading', 'loading', 'loading',
    'loading', 'loading', 'loading', 'loading', 'loading'];

  isGameStarted: boolean = true;
  roomName: string = '';

  constructor(private gameService: GameService, private route: ActivatedRoute) { }
  ngOnInit(): void {

  }

  selectCard(cardIndex: number)
  {

  }


}
